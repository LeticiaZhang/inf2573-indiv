// All heist mutations are called through rooms.js. Time and dice are injectable.
const crypto = require('crypto');
const C = require('../../config/heist/content');
const R = require('./rules');
const fail = message=>{throw new Error(message);};
function create(room, {now=Date.now, die=()=>crypto.randomInt(1,7)}={}) {
  room.mode='heist'; room.phase='heist';
  room.heist={phase:'lobby',phaseId:0,startedAt:now(),deadlineAt:null,now,die,chapterIndex:0,
    resources:{Fuel:2,Hope:2,Alert:0},flags:{},roles:{},focus:{},ballots:{},ready:{},drafts:{},votes:{},history:[],visibility:{},swapped:{},swaps:[],events:[],revealIndex:0,pausedAt:null};
}
function phase(room, name, duration) {
  const h=room.heist; h.phase=name; h.phaseId++; h.startedAt=h.now(); h.deadlineAt=duration ? h.now()+duration : null; h.ready={};
}
function active(room) {return room.players.filter(p=>p.connected);}
function enough(room) {return active(room).length>=3;}
function allReady(room) {return room.players.every(p=>room.heist.ready[p.id]);}
function enterBriefing(room) {
  const h=room.heist;
  if(!enough(room)) return phase(room,'waiting');
  h.drafts={}; h.votes={}; h.locked=null; h.revealIndex=0; phase(room,'briefing',40000);
}
function cast(room) {
  const h=room.heist; h.roles=R.assignRoles(h.seats,h.ballots); phase(room,'roles',60000);
}
function lock(room) {
  const h=room.heist;
  if(h.locked) return;
  h.choice=R.resolveVote(h.votes,h.seats,h.seats[h.chapterIndex%h.seats.length],h.chapterIndex);
  h.locked=h.seats.map(id=> {
    const a=h.drafts[id]||{track:'Cover',method:'Safe',focus:false,auto:true};
    if(a.focus) h.focus[id]=0;
    return {playerId:id,...R.resolveAction(a,C.roles[h.roles[id]],a.method==='Bold'?h.die():null)};
  });
  phase(room,'resolve'); h.revealIndex=1;
}
function resolveChapter(room) {
  const h=room.heist, chapterId=h.chapterIndex;
  const existing=h.history.find(x=>x.chapterId===chapterId);
  if(existing) return existing;
  const result={...R.applyChapterEffects(h.resources,h.flags,h.choice,h.locked,h.q),chapterId,q:h.q,actions:h.locked};
  h.resources=result.resources; h.flags=result.flags; h.history.push(result);
  for (const a of h.locked) h.events.push({type:'action_revealed',playerId:a.playerId,at:h.now(),chapter:chapterId+1,values:{contribution:a.contribution,roll:a.roll,modifier:a.modifier,focusUsed:Number(a.focus),auto:Number(!!a.auto)}});
  h.events.push({type:'chapter_settled',at:h.now(),chapter:chapterId+1,values:{...h.resources}});
  phase(room,chapterId===2?'ending':'chapter_end');
  return result;
}
function bots(room) {
  if(!room.demo) return;
  const h=room.heist;
  room.players.filter(p=>p.bot).forEach((p,i)=> {
    if(h.phase==='casting') h.ballots[p.id]={0:h.seats[0],1:h.seats[1],2:h.seats[2]};
    if(['roles','briefing','planning'].includes(h.phase)) h.ready[p.id]=true;
    if(['planning','decision'].includes(h.phase)) {
      h.drafts[p.id]={track:['Supply','Care','Cover'][i],method:'Safe',focus:false};
      // Fixed suggestions, never analysis of the human player's input.
      if(h.phase==='decision') h.votes[p.id]=[['Battery','Crank','Battery'],['Tunnel','Signal','Tunnel'],['Service','Launch','Service']][h.chapterIndex][i];
    }
  });
  h.swaps.filter(s=>room.players.find(p=>p.id===s.to)?.bot).forEach(s=>acceptSwap(room,s.to,s.from));
}
function tick(room) {
  const h=room.heist; if(!h) return false;
  const before=JSON.stringify([h.phaseId,h.swaps,h.pausedAt,room.hostId]);
  const now=h.now();
  if(!room.players.some(p=>p.connected&&!p.bot)) {
    if(h.pausedAt===null) h.pausedAt=now;
    return JSON.stringify([h.phaseId,h.swaps,h.pausedAt,room.hostId])!==before;
  }
  if(h.pausedAt!==null) {
    const dt=now-h.pausedAt; h.startedAt+=dt; if(h.deadlineAt!==null) h.deadlineAt+=dt;
    h.swaps.forEach(s=>s.expiresAt+=dt); h.pausedAt=null;
  }
  const host=room.players.find(p=>p.id===room.hostId);
  if(!host?.connected && now-(host?.disconnectedAt??now)>=30000) room.hostId=active(room).find(p=>!p.bot)?.id||room.hostId;
  h.swaps=h.swaps.filter(s=>s.expiresAt>now);
  bots(room);
  if(h.phase==='roles' && allReady(room) && h.swaps.length===0) enterBriefing(room);
  else if(h.phase==='briefing' && allReady(room) && now-h.startedAt>=10000) phase(room,'planning',90000);
  else if(h.phase==='planning' && allReady(room)) phase(room,'decision',room.demo?8000:20000);
  else if(h.phase==='waiting' && enough(room)) enterBriefing(room);
  else if(h.deadlineAt!==null && now>=h.deadlineAt) {
    if(h.phase==='casting') cast(room);
    else if(h.phase==='roles') {h.swaps=[];enterBriefing(room);}
    else if(h.phase==='briefing') phase(room,'planning',90000);
    else if(h.phase==='planning') phase(room,'decision',room.demo?8000:20000);
    else if(h.phase==='decision') lock(room);
  }
  bots(room);
  return JSON.stringify([h.phaseId,h.swaps,h.pausedAt,room.hostId])!==before;
}
function acceptSwap(room,pid,from) {
  const h=room.heist, s=h.swaps.find(s=>s.from===from&&s.to===pid&&s.expiresAt>h.now());
  if(!s) fail('That invitation has expired.');
  [h.roles[pid],h.roles[from]]=[h.roles[from],h.roles[pid]];
  h.swapped[pid]=h.swapped[from]=true; h.ready[pid]=h.ready[from]=false;
  h.swaps=h.swaps.filter(x=>x!==s);
}
function act(room,pid,event,data={}) {
  const h=room.heist;
  if(!h||room.mode!=='heist') fail('Not a Last Train room.');
  if(!room.players.some(p=>p.id===pid&&p.connected)) fail('Reconnect first.');
  tick(room);
  if(data.phaseId!==h.phaseId) fail('The scene changed. Try again.');
  const requirePhase=(...names)=>{if(!names.includes(h.phase)||h.pausedAt!==null) fail('Not available in this phase.');};
  const host=()=>{if(room.hostId!==pid)fail('Only the host can do that.');};
  if(event==='heistStart') {
    host();requirePhase('lobby');if(room.players.length<3||!enough(room)) fail('Gather at least 3 connected players.');
    h.seats=room.players.map(p=>p.id);h.initialPlayerCount=h.seats.length;h.q=Math.ceil(h.seats.length/2);
    h.focus=Object.fromEntries(h.seats.map(id=>[id,1]));phase(room,'casting',room.demo?12000:45000);
  } else if(event==='heistCastVote') {
    requirePhase('casting'); if(![0,1,2].includes(data.question)||!h.seats.includes(data.playerId)) fail('Choose a player for this question.');
    (h.ballots[pid]||={})[data.question]=data.playerId;
  } else if(event==='heistSwapRequest') {
    requirePhase('roles'); const to=data.playerId;
    if(!h.seats.includes(to)||to===pid||h.swapped[pid]||h.swapped[to]||h.swaps.some(s=>[s.from,s.to].some(id=>id===pid||id===to))) fail('That player is unavailable for a swap.');
    h.swaps.push({from:pid,to,expiresAt:h.now()+10000}); h.ready[pid]=h.ready[to]=false;
  } else if(event==='heistSwapAccept') {
    requirePhase('roles');acceptSwap(room,pid,data.playerId);
  } else if(event==='heistReady') {
    requirePhase('roles','briefing','planning');h.ready[pid]=true;
  } else if(event==='heistSetAction') {
    requirePhase('planning','decision');
    const a={track:data.track,method:data.method,focus:data.focus};
    if(!R.validAction(a,h.focus[pid])) fail('Choose a valid action. Focus is for Bold actions, once per game.');
    h.drafts[pid]=a;
  } else if(event==='heistVote') {
    requirePhase('decision'); if(!C.chapters[h.chapterIndex].options.some(o=>o.id===data.choice)) fail('Choose one of the two routes.');h.votes[pid]=data.choice;
  } else if(event==='heistAdvance') {
    host();requirePhase('resolve','chapter_end');
    if(h.phase==='resolve') {
      if(h.now()-h.startedAt<4000) fail('Give this reveal 4 seconds.');
      if(h.revealIndex<=h.seats.length) {h.revealIndex++; h.phaseId++; h.startedAt=h.now();}
      else resolveChapter(room);
    } else {h.chapterIndex++;enterBriefing(room);}
  } else if(event==='heistEndEarly') {
    host();requirePhase('waiting');phase(room,'ended');
  } else if(event==='heistRevealWish') {
    requirePhase('ending');h.visibility[pid]=true;
  } else fail('Unknown action.');
  tick(room);
}
function view(room,pid) {
  const h=room.heist, role=C.roles[h.roles[pid]], chapter=C.chapters[h.chapterIndex];
  const settled=['chapter_end','ending'].includes(h.phase);
  const shown=h.phase==='resolve'?h.locked.slice(0,Math.min(h.revealIndex,h.seats.length)):[];
  return {mode:'heist',code:room.code,you:pid,hostId:room.hostId,demo:!!room.demo,phase:h.phase,phaseId:h.phaseId,serverNow:h.now(),deadlineAt:h.deadlineAt,startedAt:h.startedAt,paused:h.pausedAt!==null,
    players:room.players.map(p=>({id:p.id,name:p.name,connected:p.connected,bot:!!p.bot,role:C.roles[h.roles[p.id]]?.name,track:C.roles[h.roles[p.id]]?.track})),
    chapterIndex:h.chapterIndex,q:h.q,resources:h.resources,flags:h.flags,
    captainId:h.seats?.[h.chapterIndex%h.seats.length],questions:C.questions,ballot:h.ballots[pid]||{},
    role:role?{...role,clue:chapter.clues[h.roles[pid]]}:null,focus:h.focus[pid],draft:h.drafts[pid]||null,vote:h.votes[pid]||null,ready:!!h.ready[pid],
    canSwap:!h.swapped[pid],swaps:h.swaps.filter(s=>s.from===pid||s.to===pid),
    chapter:{title:chapter.title,subtitle:chapter.subtitle,scene:chapter.scene,npc:chapter.npc,options:chapter.options},
    reveals:shown,showTotals:h.phase==='resolve'&&h.revealIndex>h.seats.length,
    totals:h.phase==='resolve'&&h.revealIndex>h.seats.length?R.resolveTracks(h.locked,h.q).totals:null,
    history:h.history.map(({actions,...rest})=>rest),bill:settled?h.history.at(-1):null,
    ending:h.phase==='ending'?R.computeEnding(h.resources,h.choice):null,
    wish:h.phase==='ending'?{text:role.wish,achieved:R.computeWish(h.roles[pid],pid,h.history,h.resources),public:!!h.visibility[pid]}:null,
    researchEvents:h.phase==='ending'?exportEvents(room):[],
    publicWishes:h.phase==='ending'?h.seats.filter(id=>h.visibility[id]).map(id=>({playerId:id,text:C.roles[h.roles[id]].wish,achieved:R.computeWish(h.roles[id],id,h.history,h.resources)})):[],
    memories:h.phase==='ending'?h.history.map(x=>({clue:C.chapters[x.chapterId].clues[h.roles[pid]],action:x.actions.find(a=>a.playerId===pid),totals:x.totals,q:x.q})):[],
    botClues:room.demo&&['planning','decision'].includes(h.phase)?room.players.filter(p=>p.bot).map(p=>({playerId:p.id,text:C.chapters[h.chapterIndex].clues[h.roles[p.id]]})):[]};
}
function setConnected(room,pid,connected) {
  const p=room.players.find(p=>p.id===pid);if(!p)return;
  p.connected=connected;if(!connected)p.disconnectedAt=room.heist.now();tick(room);
}
function exportEvents(room) {return room.heist.events.map(e=>({...e}));}
module.exports={create,act,tick,view,setConnected,resolveChapter,exportEvents};
