// Real transport validation against a running server (npm start in another terminal).
const assert=require('node:assert/strict');
const {io}=require('socket.io-client');
const url=process.env.TEST_URL||'http://localhost:3137';
const clients=[];
const emit=(s,event,payload={})=>new Promise((resolve,reject)=>s.timeout(4000).emit(event,payload,(e,r)=>e?reject(e):resolve(r)));
async function client(){const s=io(url,{forceNew:true});clients.push(s);let state,session;s.on('state',v=>state=v);s.on('joined',v=>session=v);await new Promise((res,rej)=>{s.on('connect',res);s.on('connect_error',rej);});return {s,get state(){return state;},get session(){return session;}};}
(async()=>{
 try{
  const a=await client();assert.equal((await emit(a.s,'create',{name:'Socket A',mode:'heist'})).ok,true);
  const b=await client(),c=await client();for(const [x,name]of [[b,'Socket B'],[c,'Socket C']])assert.equal((await emit(x.s,'join',{name,code:a.state.code})).ok,true);
  assert.equal(a.state.players.length,3);assert.equal((await emit(a.s,'forceReveal')).ok,false);
  const id=a.state.phaseId;assert.equal((await emit(b.s,'heistStart',{phaseId:id})).ok,false);assert.equal((await emit(a.s,'heistStart',{phaseId:id})).ok,true);
  assert.equal(a.state.phase,'casting');assert.equal((await emit(a.s,'heistCastVote',{phaseId:id,question:0,playerId:a.state.you})).ok,false);
  assert.equal((await emit(a.s,'heistCastVote',{phaseId:a.state.phaseId,question:0,playerId:b.state.you})).ok,true);
  assert.deepEqual(b.state.ballot,{});const saved=a.session;a.s.close();const resumed=await client();assert.equal((await emit(resumed.s,'resume',saved)).ok,true);assert.equal(resumed.state.you,saved.playerId);assert.equal(resumed.state.ballot[0],b.state.you);
  console.log('PASS: real Socket.IO create/join, 3 clients, mode/host/stale-phase guards, ballot privacy and token resume.');
 }finally{clients.forEach(s=>s.close());}
})().catch(e=>{console.error(e);process.exitCode=1;});
