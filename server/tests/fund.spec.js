const { expect } = require('chai');
const fundRepo = require('../repo/fund');

describe('Fund Routes', () => {
  let createdFund;
  //available in seed and authenticated in apiTest.js
  const createdUserId = 3;

  before(async () => {
    createdFund = await fundRepo.create(createdUserId, {
      name: 'testni fond',
      balance: 500.55,
    });
    console.log('ovo je token', global.authToken);
  });

  describe('GET /funds', () => {
    it('should require authorization', async () => {
      await global.api.get('/funds').expect(401);
    });

    it('should fetch all funds that belong to the user', async () => {
      const response = await global.api
        .get('/funds')
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);
      console.log(response.body);
      expect(response.body).to.be.an('array');
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        'id',
        'name',
        'balance',
        'user_id',
        'created_at',
      ]);
    });
  });

  describe('GET /funds/:fundId', () => {
    it('should require authorization', async () => {
      await global.api.get(`/funds/${createdFund.id}`).expect(401);
    });
    it('should fetch the fund by id that belongs to the user', async () => {
      const response = await global.api
        .get(`/funds/${createdFund.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).to.deep.equal(createdFund);
    });
  });

  describe('POST /funds', () => {
    it('should require authorization', async () => {
      await global.api.post(`/funds`).expect(401);
    });
    it('should create a new fund', async () => {
      const name = 'test post fund';
      const balance = 1000;
      const response = await global.api
        .post('/funds')
        .auth(global.authToken, { type: 'bearer' })
        .send({ name, balance })
        .expect(200);

      expect(response.body.name).to.deep.equal(name);
      expect(response.body.balance).to.deep.equal(balance);
    });
  });

  describe('PUT /funds/:fundId', () => {
    it('should require authorization', async () => {
      await global.api.put(`/funds/${createdFund.id}`).expect(401);
    });

    it('should update fund belonging to the user', async () => {
      const name = 'updated fund';
      const balance = 900;

      const response = await global.api
        .put(`/funds/${createdFund.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .send({ name, balance })
        .expect(200);

      expect(response.body.name).to.deep.equal(name);
      expect(response.body.balance).to.deep.equal(balance);
    });
  });

  describe('DELETE /funds/:fundId', () => {
    it('should require authorization', async () => {
      await global.api.delete(`/funds/${createdFund.id}`).expect(401);
    });

    it('should delete fund belonging to the user', async () => {
      const response = await global.api
        .delete(`/funds/${createdFund.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      expect(response.body > 0).to.be.true;
    });
  });
});
