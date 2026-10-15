// Fake clock: three complete games in milliseconds; no real-time waits.
const assert=require('node:assert/strict');
const {example}=require('../test/helpers');
for(const n of [3,4,6]) {
  const g=example(n,true);assert.equal(g.room.heist.phase,'ending');
  console.log(`PASS: ${n} players, 3 chapters, Q=${g.room.heist.q}, ${require('../server/heist/engine').view(g.room,'p1').ending.title}`);
}
