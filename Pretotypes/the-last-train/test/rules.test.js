const {test}=require('node:test'),assert=require('node:assert/strict');
const R=require('../server/heist/rules'),C=require('../config/heist/content');
test('all die / specialty / Focus boundaries match exact odds',()=>{
  for(const specialty of [false,true])for(const focus of [false,true]) {
    let wins=0;
    for(let die=1;die<=6;die++) {
      const r=R.resolveAction({track:'Supply',method:'Bold',focus},{track:specialty?'Supply':'Care'},die);
      assert.equal(r.success,die+Number(specialty)+(focus?2:0)>=4);wins+=r.success;
      assert.equal(r.contribution,r.success?2:0);assert.equal(r.alert,r.success?0:1);
    }
    assert.equal(wins,3+Number(specialty)+(focus?2:0));
  }
  assert.equal(R.resolveAction({track:'Care',method:'Safe',focus:false},C.roles[0]).contribution,1);
  assert.equal(R.validAction({track:'Care',method:'Safe',focus:true},1),false);
  assert.equal(R.validAction({track:'Care',method:'Bold',focus:true},0),false);
  assert.throws(()=>R.resolveAction({track:'Care',method:'Bold',focus:false},C.roles[0],7));
});
test('casting uses role queue, vote totals, then frozen seats; 3/4/6 always have the three key roles',()=>{
  for(const n of [3,4,6]) {
    const ids=Array.from({length:n},(_,i)=>`p${i}`);
    assert.deepEqual(Object.values(R.assignRoles(ids,{})),Array.from({length:n},(_,i)=>i));
    const assigned=R.assignRoles(ids,{p0:{0:'p2',1:'p1',2:'p0'}});
    assert.equal(assigned.p2,0);assert.equal(assigned.p1,1);assert.equal(assigned.p0,2);
    for(const c of C.chapters) for(const i of [0,1,2])assert.ok(c.clues[i]);
  }
});
test('vote majority, rotating captain ties, missing captain and chapter defaults',()=>{
  const ids=['a','b','c','d'];
  assert.equal(R.resolveVote({a:'Battery',b:'Crank',c:'Crank'},ids,'a',0),'Crank');
  assert.equal(R.resolveVote({a:'Battery',b:'Crank'},ids,'b',0),'Crank');
  assert.equal(R.resolveVote({a:'Battery',b:'Crank'},ids,'d',0),'Battery');
  assert.equal(R.resolveVote({a:'invalid'},ids,'a',0),'Battery');
  [0,1,2].forEach(c=>assert.equal(R.resolveVote({},ids,'a',c),C.chapters[c].default));
});
test('track aggregation triggers each benefit once at Q=ceil(N/2)',()=>{
  for(const n of [3,4,6]) {
    const q=Math.ceil(n/2),a=Array.from({length:n},()=>({track:'Supply',contribution:2}));
    assert.equal(R.resolveTracks(a,q).delta.Fuel,1);
    assert.equal(R.resolveTracks([{track:'Supply',contribution:q-1}],q).delta.Fuel,0);
    assert.deepEqual(R.resolveTracks(['Supply','Care','Cover'].map(track=>({track,contribution:q})),q).delta,{Fuel:1,Hope:1,Alert:-1});
  }
});
test('settlement combines all deltas before one clamp, including failure and Cover',()=>{
  const a=[{track:'Cover',contribution:2,alert:0}];
  const r=R.applyChapterEffects({Fuel:2,Hope:2,Alert:0},{},'Battery',a,2);
  assert.deepEqual(r.resources,{Fuel:4,Hope:2,Alert:0});
  const over=R.applyChapterEffects({Fuel:6,Hope:6,Alert:6},{},'Service',[{track:'Supply',contribution:0,alert:1}],2);
  assert.equal(over.resources.Alert,6); // +1 then −1, not clamp to 6 then −1
});
test('chapter 2 flag consequences occur only on the relevant branch',()=>{
  const base={Fuel:3,Hope:3,Alert:2};
  assert.equal(R.applyChapterEffects(base,{batteryTaken:true},'Tunnel',[],2).resources.Hope,2);
  assert.equal(R.applyChapterEffects(base,{stationLit:true},'Tunnel',[],2).resources.Hope,3);
  assert.equal(R.applyChapterEffects(base,{stationLit:true},'Signal',[],2).resources.Hope,5);
  assert.equal(R.applyChapterEffects(base,{batteryTaken:true},'Signal',[],2).resources.Hope,4);
});
test('all three endings and both costly conditions, fuel checked first',()=>{
  assert.equal(R.computeEnding({Fuel:2,Hope:2,Alert:4},'Service').title,'Clean Escape');
  assert.equal(R.computeEnding({Fuel:2,Hope:2,Alert:4},'Launch').title,'Train Stalled');
  const e=R.computeEnding({Fuel:3,Hope:1,Alert:5},'Launch');
  assert.equal(e.title,'Costly Escape');assert.match(e.text,/exhausted/);assert.match(e.text,/wardens/);
  assert.equal(R.computeEnding({Fuel:0,Hope:0,Alert:6},'Service').title,'Train Stalled');
});
