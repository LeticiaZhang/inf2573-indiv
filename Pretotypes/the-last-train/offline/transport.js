// Browser-only demo transport. It uses the very same rules and engine as multiplayer.
// All state is local to this browser; this is deliberately NOT a network room.
(function () {
  const engine = loadModule('/server/heist/engine.js');
  const STORAGE = 'last-train-offline-room-v1';
  const die = () => browserCrypto.randomInt(1, 7);
  window.LAST_TRAIN_OFFLINE = true;
  window.io = function () {
    let room = null;
    const listeners = new Map();
    const fire = (event, payload) => (listeners.get(event) || []).forEach(fn => fn(payload));
    function save() {
      try { sessionStorage.setItem(STORAGE, JSON.stringify({version:1, savedAt:Date.now(), room})); } catch { /* Some file:// browsers deny storage. Playing still works. */ }
    }
    function broadcast() {
      if (!room) return;
      save();
      fire('state', engine.view(room, 'p1'));
    }
    function restore() {
      let saved;
      try { saved = JSON.parse(sessionStorage.getItem(STORAGE)); } catch { return false; }
      if (!saved || saved.version !== 1 || !saved.room?.heist) return false;
      room = saved.room;
      const h = room.heist, elapsed = Math.max(0, Date.now() - saved.savedAt);
      h.now = Date.now; h.die = die;
      h.startedAt += elapsed;
      if (h.deadlineAt !== null) h.deadlineAt += elapsed;
      h.swaps.forEach(s => s.expiresAt += elapsed);
      return true;
    }
    const transport = {
      on(event, fn) { if (!listeners.has(event)) listeners.set(event, []); listeners.get(event).push(fn); return transport; },
      emit(event, data = {}, ack = () => {}) {
        try {
          if (event === 'create') {
            if (!data.demo) throw new Error('This file is a solo demo. Use the multiplayer server for a shared room.');
            const name = String(data.name || '').trim().slice(0,20);
            if (!name) throw new Error('Please enter a name.');
            room = {code:'SOLO',hostId:'p1',demo:true,players:[name,'Milo · BOT','June · BOT','Kit · BOT'].map((name,i)=>({id:`p${i+1}`,name,connected:true,bot:i>0}))};
            engine.create(room, {die});
            fire('joined', {code:'SOLO',token:'local-demo',playerId:'p1',name});
          } else if (event === 'resume') {
            if (!restore()) throw new Error('No saved demo. Start a new journey.');
          } else {
            if (!room) throw new Error('Start a demo first.');
            engine.act(room, 'p1', event, data);
          }
          broadcast(); ack({ok:true});
        } catch (error) { ack({ok:false,error:error.message}); }
      }
    };
    setInterval(() => { if (room && engine.tick(room)) broadcast(); }, 250);
    // Save the exact dice and remaining time when refreshing or closing the file.
    window.addEventListener('pagehide', save);
    queueMicrotask(() => fire('connect'));
    return transport;
  };
})();
