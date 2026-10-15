const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {webcrypto}=require('node:crypto');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'Play-The-Last-Train.html'),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
function browserDemo(storage=new Map(),start=1000){
 let time=start,state,session;const intervals=[],microtasks=[];
 const context={crypto:webcrypto,Date:{now:()=>time},window:{addEventListener(){}},sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setInterval:fn=>intervals.push(fn),queueMicrotask:fn=>microtasks.push(fn)};
 vm.createContext(context);vm.runInContext(scripts[0],context);
 const socket=context.window.io();socket.on('state',s=>state=JSON.parse(JSON.stringify(s)));socket.on('joined',s=>session=s);microtasks.forEach(fn=>fn());
 const emit=(event,data={})=>{let ack;socket.emit(event,{phaseId:state?.phaseId,...data},r=>ack=r);assert.equal(ack.ok,true,ack.error);};
 return {emit,step(ms){time+=ms;intervals.forEach(fn=>fn());},get state(){return state;},get session(){return session;},storage};
}
test('offline artifact includes all assets and scripts without external network dependencies',()=>{
 assert.equal(scripts.length,2);scripts.forEach(s=>assert.doesNotThrow(()=>new vm.Script(s)));
 assert.ok(!/<script[^>]+src=/.test(html));assert.ok(!/<link[^>]+(?:stylesheet|preload)/.test(html));
 assert.ok(html.includes('data:image/svg+xml;base64,'));assert.ok(html.includes('if(!OFFLINE)fetch'));
 assert.ok(html.includes('Offline solo demo'));assert.ok(html.includes('This file cannot host a shared room'));
});
test('browser bundle completes all chapters offline, including alternative choices and wish reveal',()=>{
 const g=browserDemo();g.emit('create',{name:'Offline Player',demo:true});g.emit('heistStart');g.step(12000);g.emit('heistReady');
 for(let chapter=0;chapter<3;chapter++){
  g.step(10000);g.emit('heistReady');assert.equal(g.state.phase,'planning');
  g.emit('heistSetAction',{track:'Supply',method:'Safe',focus:false});g.emit('heistReady');g.emit('heistVote',{choice:['Crank','Signal','Service'][chapter]});g.step(8000);
  while(g.state.phase==='resolve'){g.step(4000);g.emit('heistAdvance');}
  if(chapter<2)g.emit('heistAdvance');
 }
 assert.equal(g.state.phase,'ending');assert.equal(g.state.history.length,3);assert.equal(g.state.history[0].choice,'Crank');
 g.emit('heistRevealWish');assert.equal(g.state.wish.public,true);
});
test('offline refresh restores saved die and Focus rather than rolling or charging again',()=>{
 const g=browserDemo();g.emit('create',{name:'Tester',demo:true});g.emit('heistStart');g.step(12000);g.emit('heistReady');g.step(10000);g.emit('heistReady');
 g.emit('heistSetAction',{track:'Supply',method:'Bold',focus:true});g.emit('heistReady');g.step(8000);
 const restored=browserDemo(g.storage,500000);restored.emit('resume',g.session);
 assert.deepEqual(restored.state.reveals,g.state.reveals);assert.equal(restored.state.focus,0);assert.equal(restored.state.phase,'resolve');
});
