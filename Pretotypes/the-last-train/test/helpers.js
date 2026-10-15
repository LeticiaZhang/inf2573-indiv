const E=require('../server/heist/engine');
function game(n=3,{demo=false,rolls=[3,4,2,6,1,5]}={}) {
  let time=1000,rollIndex=0;
  const room={code:'TEST',hostId:'p1',players:Array.from({length:n},(_,i)=>({id:`p${i+1}`,name:`Player ${i+1}`,connected:true,bot:demo&&i>0})),demo};
  E.create(room,{now:()=>time,die:()=>rolls[(rollIndex++)%rolls.length]});
  const act=(id,event,data={})=>E.act(room,id,event,{phaseId:room.heist.phaseId,...data});
  const step=ms=>{time+=ms;E.tick(room);};
  const allReady=()=>room.players.forEach(p=>act(p.id,'heistReady'));
  const start=()=>{act('p1','heistStart');step(demo?12000:45000);allReady();};
  const planning=()=>{step(10000);if(room.heist.phase==='briefing')allReady();};
  const resolve=()=>{while(room.heist.phase==='resolve'){step(4000);act(room.hostId,'heistAdvance');}};
  return {room,act,step,allReady,start,planning,resolve,get rolls(){return rollIndex;}};
}
function example(n=3,log=false) {
  const g=game(n);g.start();
  for(let c=0;c<3;c++) {
    g.planning();
    const actions=[
      [{track:'Supply',method:'Bold'},{track:'Cover',method:'Safe'},{track:'Cover',method:'Safe'}],
      [{track:'Supply',method:'Safe'},{track:'Supply',method:'Safe'},{track:'Care',method:'Bold'}],
      [{track:'Cover',method:'Safe'},{track:'Cover',method:'Safe'},{track:'Care',method:'Safe'}],
    ][c];
    g.room.players.forEach((p,i)=>g.act(p.id,'heistSetAction',{...(actions[i]||{track:c===1?'Care':'Supply',method:'Safe'}),focus:false}));
    g.allReady();g.room.players.forEach(p=>g.act(p.id,'heistVote',{choice:['Battery','Tunnel','Service'][c]}));
    g.step(20000);g.resolve();
    if(log)console.log(JSON.stringify({players:n,chapter:c+1,...g.room.heist.history.at(-1)},null,2));
    if(c<2)g.act('p1','heistAdvance');
  }
  return g;
}
module.exports={game,example};
