// signaller.js - WebSocket Signaling Server
// Run: npm install ws && node signaller.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
console.log('Signaller listening on ws://0.0.0.0:3000');

let clients = new Map();

wss.on('connection', (ws) => {
  const id = Math.random().toString(36).slice(2, 9);
  clients.set(id, ws);
  ws.send(JSON.stringify({ type: 'welcome', id, peers: Array.from(clients.keys()).filter(x => x !== id) }));
  broadcastPeers();

  ws.on('message', msg => {
    try {
      const data = JSON.parse(msg);
      if (data.target && clients.has(data.target)) {
        clients.get(data.target).send(JSON.stringify({ ...data, from: id }));
      }
    } catch (e) {
      console.error('Bad message', e);
    }
  });

  ws.on('close', () => {
    clients.delete(id);
    broadcastPeers();
  });
});

function broadcastPeers() {
  const ids = Array.from(clients.keys());
  for (const [id, ws] of clients) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'peers', peers: ids.filter(x => x !== id) }));
    }
  }
}
