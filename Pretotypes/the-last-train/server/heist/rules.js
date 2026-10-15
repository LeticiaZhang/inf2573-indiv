const {roles, chapters, outcomes} = require('../../config/heist/content');
const tracks = ['Supply','Care','Cover'];
function validAction(a, focus) {
  return a && tracks.includes(a.track) && ['Safe','Bold'].includes(a.method) && typeof a.focus === 'boolean' && (!a.focus || (a.method === 'Bold' && focus === 1));
}
function resolveAction(action, role, roll) {
  if (!validAction(action,1)) throw new Error('Invalid action');
  const modifier = action.method === 'Bold' ? Number(role.track === action.track) + (action.focus ? 2 : 0) : 0;
  if (action.method === 'Bold' && (!Number.isInteger(roll) || roll < 1 || roll > 6)) throw new Error('Invalid die');
  const success = action.method === 'Safe' || roll + modifier >= 4;
  return {...action, roll:action.method === 'Bold' ? roll : null, modifier, threshold:4, success, contribution:success ? (action.method === 'Safe' ? 1 : 2) : 0, alert:success ? 0 : 1};
}
function resolveTracks(actions, q) {
  const totals = Object.fromEntries(tracks.map(t=>[t, actions.filter(a=>a.track === t).reduce((s,a)=>s+a.contribution,0)]));
  return {totals, delta:{Fuel:Number(totals.Supply>=q),Hope:Number(totals.Care>=q),Alert:-Number(totals.Cover>=q)}};
}
function resolveVote(votes, seats, captain, chapter) {
  const options = chapters[chapter].options.map(o=>o.id);
  const counts = Object.fromEntries(options.map(o=>[o,seats.filter(id=>votes[id]===o).length]));
  const max = Math.max(...Object.values(counts));
  if (!max) return chapters[chapter].default;
  const tied = options.filter(o=>counts[o]===max);
  if (tied.includes(votes[captain])) return votes[captain];
  return votes[seats.find(id=>tied.includes(votes[id]))];
}
function assignRoles(seats, ballots) {
  const remaining = [...seats], assigned = {};
  roles.slice(0,seats.length).forEach((r, ri)=> {
    const count = id=>Object.values(ballots).filter(b=>b[r.question]===id).length;
    const best = remaining.reduce((a,b)=>count(b)>count(a) ? b : a);
    assigned[best] = ri; remaining.splice(remaining.indexOf(best),1);
  });
  return assigned;
}
function applyChapterEffects(before, flags, choice, actions, q) {
  const nextFlags = {...flags};
  const track = resolveTracks(actions,q);
  const lines = [{label:'Bold failures',delta:{Alert:actions.reduce((s,a)=>s+a.alert,0)}},
    ...tracks.map((t,i)=>({label:`${t} ${track.totals[t]}/${q}${track.totals[t]>=q?' · threshold reached':''}`,delta:{[['Fuel','Hope','Alert'][i]]:Object.values(track.delta)[i]}}))];
  const effects = {Battery:{Fuel:2,Alert:1},Crank:{Hope:-1,Alert:-1},Tunnel:{Fuel:-1,Alert:-1},Signal:{Hope:1,Alert:1},Launch:{Hope:1,Alert:1},Service:{Alert:-1}};
  if (!effects[choice]) throw new Error('Unknown choice');
  lines.push({label:`Because you chose ${choice}`,delta:effects[choice]});
  let text = outcomes[choice];
  if (choice==='Battery') nextFlags.batteryTaken=true;
  if (choice==='Crank') nextFlags.stationLit=true;
  if (choice==='Tunnel' || choice==='Signal') nextFlags.route=choice.toLowerCase();
  if (choice==='Tunnel' && flags.batteryTaken) { lines.push({label:'Battery removed → ventilation failed',delta:{Hope:-1}}); text+=' The dead ventilation fans unsettle the passengers. Hope −1.'; }
  if (choice==='Signal' && flags.stationLit) { lines.push({label:'Lit station → reassuring signal',delta:{Hope:1}}); text+=' The platform lights answer your signal. Extra Hope +1.'; }
  const resources = Object.fromEntries(Object.entries(before).map(([k,v])=>[k,Math.max(0,Math.min(6,v+lines.reduce((s,l)=>s+(l.delta[k]||0),0)))]));
  return {before:{...before},resources,flags:nextFlags,choice,lines,totals:track.totals,text};
}
function computeEnding(r,choice) {
  const threshold = choice==='Launch'?3:2;
  if (r.Fuel<threshold) return {title:'Train Stalled',threshold,text:'The engine falls quiet. You all take shelter in the underground waiting room. The shared mission is unfinished. No one is left behind.'};
  const reasons=[];
  if (r.Hope<2) reasons.push('The crew leaves exhausted and shaken.');
  if (r.Alert>4) reasons.push('The wardens are close behind.');
  return {title:reasons.length?'Costly Escape':'Clean Escape',threshold,text:reasons.length?`Everyone gets away. ${reasons.join(' ')}`:'Everyone is aboard. The city lights fade behind you. You found a way out together.'};
}
function computeWish(role, pid, history, r) {
  return [()=>history.some(h=>h.actions.some(a=>a.playerId===pid&&a.track==='Supply'&&a.success)),
    ()=>history.some(h=>h.choice==='Service'),()=>history.some(h=>h.totals.Care>=h.q),
    ()=>history.some(h=>h.choice==='Tunnel'),()=>r.Fuel>=3,()=>r.Hope>=3][role]();
}
module.exports={tracks,validAction,resolveAction,resolveTracks,resolveVote,assignRoles,applyChapterEffects,computeEnding,computeWish};
