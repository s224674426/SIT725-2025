// tests/integration/health.test.js
const request = require('supertest');

// Mock DB so importing app doesn't try to connect
jest.mock('../../config/db', () => ({ query: jest.fn() }));

const app = require('../../app');

describe('Health', () => {
  test('GET /health → 200 & {ok:true}', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body).toHaveProperty('ok', true);
  });
});

