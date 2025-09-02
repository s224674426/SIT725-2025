const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (s) => {
  console.log('connected:', s.id);
  s.emit('welcome', { msg: 'Hello from server' });
  s.on('chat:message', (t) => io.emit('chat:message', String(t)));
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => console.log(`Server on http://localhost:${PORT}`));
}
module.exports = { app, server, io };
