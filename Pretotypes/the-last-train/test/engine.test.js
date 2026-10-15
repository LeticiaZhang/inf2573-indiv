const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../server/heist/engine'),R=require('../server/heist/rules'),rooms=require('../server/rooms');
const {game,example}=require('./helpers');
test('brief’s exact 3-person integration example, all wishes and idempotent settlement',()=>{
  const g=example();assert.equal(g.room.heist.phase,'ending');
  for(const h of g.room.heist.history)assert.deepEqual(h.resources,{Fuel:5,Hope:2,Alert:0});
  for(const p of g.room.players)assert.equal(E.view(g.room,p.id).wish.achieved,true);
  assert.equal(g.rolls,2);E.resolveChapter(g.room);assert.equal(g.room.heist.history.length,3);
  assert.equal(E.view(g.room,'p1').ending.title,'Clean Escape');
});
for(const n of [4,6])test(`${n} players finish all three chapters with frozen Q`,()=>{
  const g=example(n);assert.equal(g.room.heist.history.length,3);assert.equal(g.room.heist.phase,'ending');assert.equal(g.room.heist.q,Math.ceil(n/2));
});
test('private wishes and drafts stay isolated; reveal exposes only the current and prior dice',()=>{
  const g=game();g.start();g.planning();g.act('p1','heistSetAction',{track:'Supply',method:'Bold',focus:true});
  let v=E.view(g.room,'p2');assert.equal(v.draft,null);assert.equal(v.role.name,'Mechanic');assert.equal(v.roles,undefined);assert.equal(v.ballots,undefined);
  g.allReady();g.step(20000);assert.equal(g.rolls,1);v=E.view(g.room,'p2');assert.equal(v.reveals.length,1);assert.equal(v.history.length,0);assert.equal(v.bill,null);
  const complete=example();assert.equal(E.view(complete.room,'p2').publicWishes.length,0);
  complete.act('p1','heistRevealWish');assert.equal(E.view(complete.room,'p2').publicWishes.length,1);
  assert.throws(()=>complete.act('p1','heistVote',{choice:'Battery'}));
});
test('draft Focus can be withdrawn, consumed only once at lock; replay cannot roll again',()=>{
  const g=game();g.start();g.planning();const a={track:'Supply',method:'Bold',focus:true};
  g.act('p1','heistSetAction',a);assert.equal(g.room.heist.focus.p1,1);
  g.act('p1','heistSetAction',{...a,focus:false});assert.equal(g.room.heist.focus.p1,1);
  assert.throws(()=>g.act('p1','heistSetAction',{...a,method:'Safe'}));
  g.act('p1','heistSetAction',a);g.allReady();const old=g.room.heist.phaseId;g.step(20000);
  assert.equal(g.room.heist.focus.p1,0);assert.equal(g.rolls,1);
  assert.throws(()=>g.act('p1','heistSetAction',{...a,phaseId:old}));g.step(20000);assert.equal(g.rolls,1);
  assert.equal(g.room.heist.locked[1].auto,true);
});
test('role exchange is mutual, atomic, once per participant; invitation expires and reserves players',()=>{
  const g=game();g.act('p1','heistStart');g.step(45000);
  g.act('p1','heistSwapRequest',{playerId:'p2'});assert.equal(g.room.heist.roles.p1,0);
  assert.throws(()=>g.act('p3','heistSwapRequest',{playerId:'p2'}));
  g.act('p2','heistSwapAccept',{playerId:'p1'});assert.equal(E.view(g.room,'p1').role.name,'Mechanic');assert.equal(E.view(g.room,'p2').role.name,'Runner');
  assert.throws(()=>g.act('p1','heistSwapRequest',{playerId:'p3'}));
  const x=game();x.act('p1','heistStart');x.step(45000);x.act('p1','heistSwapRequest',{playerId:'p2'});x.step(10000);assert.throws(()=>x.act('p2','heistSwapAccept',{playerId:'p1'}));
});
test('readiness does not lock actions and briefing takes at least ten seconds',()=>{
  const g=game();g.start();g.allReady();assert.equal(g.room.heist.phase,'briefing');g.step(9999);assert.equal(g.room.heist.phase,'briefing');g.step(1);assert.equal(g.room.heist.phase,'planning');
  g.act('p1','heistReady');g.act('p1','heistSetAction',{track:'Care',method:'Safe',focus:false});assert.equal(g.room.heist.drafts.p1.track,'Care');
});
test('all offline pauses exact time; reconnect preserves secrets and rolls; host transfers after grace',()=>{
  const g=game();g.start();const clue=E.view(g.room,'p1').role.clue;
  g.room.players.forEach(p=>E.setConnected(g.room,p.id,false));const old=g.room.heist.deadlineAt;g.step(60000);assert.equal(g.room.heist.phase,'briefing');
  E.setConnected(g.room,'p2',true);assert.equal(g.room.heist.deadlineAt,old+60000);assert.equal(g.room.hostId,'p2');
  assert.equal(E.view(g.room,'p1').role.clue,clue);assert.equal(g.room.heist.q,2);
  g.room.players.forEach(p=>E.setConnected(g.room,p.id,true));g.planning();g.act('p1','heistSetAction',{track:'Supply',method:'Bold',focus:false});g.allReady();g.step(20000);
  const roll=g.room.heist.locked[0].roll;E.setConnected(g.room,'p1',false);g.step(4000);E.setConnected(g.room,'p1',true);assert.equal(g.room.heist.locked[0].roll,roll);assert.equal(g.rolls,1);
});
test('fewer than 3 connected blocks the next chapter; host can end without a success claim',()=>{
  const g=game();g.start();g.planning();g.allReady();g.step(20000);g.resolve();E.setConnected(g.room,'p3',false);g.act('p1','heistAdvance');assert.equal(g.room.heist.phase,'waiting');g.act('p1','heistEndEarly');assert.equal(g.room.heist.phase,'ended');assert.equal(E.view(g.room,'p1').ending,null);
});
test('classic events are rejected in heist; Classic remains the default creation mode',()=>{
  const {room,player}=rooms.createRoom('Host','heist');
  for(const ev of ['start','forceReveal','nextRound','revealNext','playAgain'])assert.throws(()=>rooms[ev](room,player.id));
  assert.equal(rooms.createRoom('Classic Host').room.phase,'lobby');
});
test('bots share clues only in demo, with deterministic actions and a human decision',()=>{
  const g=game(4,{demo:true});g.act('p1','heistStart');g.step(12000);g.act('p1','heistReady');g.step(10000);g.act('p1','heistReady');
  assert.equal(g.room.heist.phase,'planning');assert.equal(E.view(g.room,'p1').botClues.length,3);
  g.act('p1','heistReady');g.act('p1','heistVote',{choice:'Crank'});g.step(8000);assert.equal(g.room.heist.choice,'Crank');
  const x=game(4);x.start();x.planning();assert.equal(E.view(x.room,'p1').botClues.length,0);
});
test('a coordinated all-Safe game can reach Clean Escape without any dice',()=>{
  const g=game();g.start();
  const tracks=[['Supply','Supply','Care'],['Care','Care','Cover'],['Cover','Cover','Care']];
  for(let c=0;c<3;c++){
    g.planning();g.room.players.forEach((p,i)=>g.act(p.id,'heistSetAction',{track:tracks[c][i],method:'Safe',focus:false}));g.allReady();
    g.room.players.forEach(p=>g.act(p.id,'heistVote',{choice:['Battery','Tunnel','Service'][c]}));g.step(20000);g.resolve();if(c<2)g.act('p1','heistAdvance');
  }
  assert.equal(g.rolls,0);assert.equal(E.view(g.room,'p1').ending.title,'Clean Escape');
});
test('reveal cannot be accelerated or replayed and late ballots cannot change locked outcome',()=>{
  const g=game();g.start();g.planning();g.allReady();const old=g.room.heist.phaseId;g.step(20000);
  assert.throws(()=>g.act('p1','heistAdvance'));assert.throws(()=>g.act('p1','heistVote',{phaseId:old,choice:'Crank'}));
  g.step(4000);const revealId=g.room.heist.phaseId;g.act('p1','heistAdvance');assert.equal(g.room.heist.revealIndex,2);
  assert.throws(()=>g.act('p1','heistAdvance',{phaseId:revealId}));assert.equal(g.room.heist.revealIndex,2);
});
test('research export includes only anonymous identifiers, event types, timestamps and numeric results',()=>{
  const g=example();const events=E.exportEvents(g.room);assert.equal(events.length,12);
  for(const e of events){assert.deepEqual(Object.keys(e).sort(),(e.playerId?['type','playerId','at','chapter','values']:['type','at','chapter','values']).sort());for(const v of Object.values(e.values))assert.ok(v===null||typeof v==='number');}
  const text=JSON.stringify(events);for(const p of g.room.players)assert.ok(!text.includes(p.name));assert.ok(!text.includes('wish'));assert.ok(!text.includes('secret'));
});
