// tests/integration/products.api.test.js
const request = require('supertest');

// 🔒 Mock the DB pool used by models/controllers
jest.mock('../../config/db', () => ({ query: jest.fn() }));
const db = require('../../config/db');

// ⬇️ Only import the app AFTER the mock is in place
const app = require('../../app');

describe('Products API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/products → 200 & array of products', async () => {
    db.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'Mouse', price: 25 },
        { id: 2, name: 'Keyboard', price: 49.99 }
      ]
    });

    const res = await request(app).get('/api/products').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });

  test('POST /api/products → 201 & created product returned', async () => {
    // Most controllers do INSERT ... RETURNING *
    db.query.mockResolvedValueOnce({
      rows: [{ id: 3, name: 'Headset', price: 79.99 }]
    });

    const payload = { name: 'Headset', price: 79.99 };
    const res = await request(app).post('/api/products').send(payload).expect(201);

    expect(res.body).toMatchObject(payload);
    expect(res.body).toHaveProperty('id');
  });
});


