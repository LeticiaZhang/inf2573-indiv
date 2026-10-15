// No bundler or npm packages needed. Produces one self-contained, file://-safe HTML.
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const files=['config/heist/content.js','server/heist/rules.js','server/heist/engine.js'];
const modules=files.map(p=>`${JSON.stringify('/'+p)}:function(module,exports,require){\n${read(p)}\n}`).join(',\n');
const bundle=`
const browserCrypto={randomInt(min,max){
 const range=max-min,limit=Math.floor(4294967296/range)*range,value=new Uint32Array(1);
 do { crypto.getRandomValues(value); } while(value[0]>=limit);
 return min+(value[0]%range);
}};
const offlineModules={${modules}};
const moduleCache={};
function loadModule(id){
 if(id==='crypto')return browserCrypto;
 if(moduleCache[id])return moduleCache[id].exports;
 const module={exports:{}};moduleCache[id]=module;
 offlineModules[id](module,module.exports,function(request){
  if(request==='crypto')return browserCrypto;
  const parts=(id.slice(0,id.lastIndexOf('/')+1)+request).split('/'),out=[];
  for(const p of parts){if(p==='..')out.pop();else if(p&&p!=='.')out.push(p);}
  let target='/'+out.join('/');if(!target.endsWith('.js'))target+='.js';return loadModule(target);
 });return module.exports;
}
${read('offline/transport.js')}
`;
const script=s=>'<script>\n'+s.replace(/<\/script/gi,'<\\/script')+'\n</script>';
const svg='data:image/svg+xml;base64,'+Buffer.from(read('public/train.svg')).toString('base64');
let html=read('public/index.html')
 .replace('<link rel="stylesheet" href="/style.css">','<style>'+read('public/style.css')+'</style>')
 .replace('href="/"','href=""')
 .replace('Scripted demo · No AI key needed','Offline solo demo · No installation · No network rooms')
 .replace('<script src="/socket.io/socket.io.js"></script>',script(bundle))
 .replace('<script src="/app.js"></script>',script(read('public/app.js').replace('src="/train.svg"',`src="${svg}"`)));
fs.writeFileSync(path.join(root,'Play-The-Last-Train.html'),html);
console.log(`Built Play-The-Last-Train.html (${Buffer.byteLength(html)} bytes). Open it directly in your browser.`);
