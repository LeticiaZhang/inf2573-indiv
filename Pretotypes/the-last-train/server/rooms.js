// Single mutation gateway for both modes. Classic events cannot mutate heist rooms.
const classic=require('./classic-rooms');
const heist=require('./heist/engine');
const heistRooms=new Set();
const api={...classic};
for(const name of ['start','voteWorld','lockWorld','quizAnswer','forceQuiz','nextRound','answer','forceReveal','revealVoters','revealNext','react','playAgain']) {
  api[name]=(room,...args)=>{
    if(!room||room.mode==='heist') throw new classic.GameError('Use The Last Train controls.');
    return classic[name](room,...args);
  };
}
api.createRoom=(name,mode='classic',demo=false)=>{
  const result=classic.createRoom(name);
  if(mode==='heist') {
    if(demo) ['Milo','June','Kit'].forEach(name=>{const {player}=classic.joinRoom(result.room.code,name+' · BOT');player.bot=true;});
    result.room.demo=!!demo;heist.create(result.room);heistRooms.add(result.room);
  }
  return result;
};
api.joinRoom=(code,name)=>{
  const room=classic.getRoom(code);
  if(room.mode!=='heist')return classic.joinRoom(code,name);
  if(room.heist.phase!=='lobby'||room.demo)throw new classic.GameError('This room is not accepting players.');
  room.phase='lobby';try{return classic.joinRoom(code,name);}finally{room.phase='heist';}
};
api.resume=(code,token)=>{
  const room=classic.getRoom(code);
  if(room.mode!=='heist')return classic.resume(code,token);
  const player=room.players.find(p=>p.token===token&&!p.bot);
  if(!player)throw new classic.GameError('Could not rejoin.');
  return {room,player};
};
api.publicState=(room,pid)=>room.mode==='heist'?heist.view(room,pid):classic.publicState(room,pid);
api.setConnected=(room,pid,value)=>room.mode==='heist'?heist.setConnected(room,pid,value):classic.setConnected(room,pid,value);
api.heistAction=(room,pid,event,data)=>{
  try {return heist.act(room,pid,event,data);}catch(e){throw new classic.GameError(e.message);}
};
api.tick=()=>{for(const room of heistRooms)if(heist.tick(room))classic.changed(room);};
module.exports=api;
