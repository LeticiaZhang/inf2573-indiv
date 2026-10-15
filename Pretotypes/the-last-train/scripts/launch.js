// Friendly local multiplayer launcher. Requires an existing Node.js 18+ install.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,spawnSync}=require('node:child_process');
const root=path.join(__dirname,'..');
process.chdir(root);
if(Number(process.versions.node.split('.')[0])<18){console.error('Please install Node.js 18 or newer from https://nodejs.org/');process.exit(1);}
const fingerprint=crypto.createHash('sha256').update(fs.readFileSync('package-lock.json')).digest('hex');
const marker=path.join(root,'node_modules','.last-train-lock');
let installed=false;
try{require.resolve('express');require.resolve('socket.io');installed=fs.readFileSync(marker,'utf8')===fingerprint;}catch{}
if(process.argv.includes('--check')){console.log(`Node ${process.versions.node}; project: ${root}; dependencies ${installed?'ready':'will be checked/installed on launch'}`);process.exit(0);}
if(!installed){
  console.log('First launch: preparing the game. An internet connection is needed for this step.');
  const npm=process.platform==='win32'?'npm.cmd':'npm';
  const result=spawnSync(npm,['ci','--omit=dev'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
  if(result.error||result.status!==0){console.error('Setup did not finish. Check your connection and open the launcher again.');process.exit(1);}
  fs.writeFileSync(marker,fingerprint);
}
console.log('Starting The Last Train. Keep this window open while your friends play.');
const child=spawn(process.execPath,['server/index.js'],{cwd:root,env:{...process.env,PORT:process.env.PORT||'0',GM_MODE:'mock'},stdio:['inherit','pipe','inherit']});
let opened=false,output='';
child.stdout.on('data',data=>{
 process.stdout.write(data);output=(output+data).slice(-5000);
 const match=output.match(/This computer:\s+(http:\/\/localhost:\d+)/);
 if(match&&!opened){
  opened=true;const url=match[1];
  const command=process.platform==='darwin'?'open':process.platform==='win32'?'cmd.exe':'xdg-open';
  const args=process.platform==='win32'?['/c','start','',url]:[url];
  const opener=spawn(command,args,{stdio:'ignore'});opener.on('error',()=>console.log(`Open ${url} in your browser.`));
 }
});
child.on('error',e=>{console.error(e.message);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code||0;});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
