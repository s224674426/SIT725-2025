// week7/tests/api.test.js
const request = require('supertest');
const { app, server } = require('../server');

// Use a Promise (no 'done' + no implicit return)
afterAll(() =>
  new Promise((resolve) => {
    server.close(resolve);
  })
);

test('GET /health -> 200 and ok:true', async () => {
  const res = await request(app).get('/health');
  expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
  // Be tolerant of extra fields (e.g., env: 'test')
  expect(res.body).toMatchObject({ ok: true });
});
