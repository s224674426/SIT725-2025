// week7/tests/socket.test.js
const { io: Client } = require('socket.io-client');
const { server } = require('../server');
const PORT = process.env.PORT || 3000;

beforeAll(() =>
  new Promise((resolve) => {
    if (!server.listening) server.listen(PORT, resolve);
    else resolve();
  })
);

afterAll(() =>
  new Promise((resolve) => {
    server.close(resolve);
  })
);

test('receives welcome on connect', (done) => {
  const c = new Client(`http://localhost:${PORT}`, { transports: ['websocket'] });
  c.on('welcome', (d) => {
    try { expect(d.msg).toMatch(/Hello/); c.close(); done(); }
    catch (e) { done(e); }
  });
});
