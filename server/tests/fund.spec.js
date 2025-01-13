const { expect } = require('chai');
const fundRepo = require('../repo/fund');
const currency = require('currency.js');
const cc = require('currency-codes');
const getSymbolFromCurrency = require('currency-symbol-map');

describe('Fund Routes', () => {
  let createdFund;
  // Available in the seed and logged in via supertest
  const createdUserId = 3;

  before(async () => {
    createdFund = await fundRepo.create(createdUserId, {
      name: 'My USD Fund (Test)',
      currency: 'USD',
      balance: 500.55,
    });
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
        'currency',
        'balance',
        'user_id',
        'created_at',
        'updated_at',
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
      const name = 'My JPY Fund (Test)';
      const currencyCode = 'JPY';
      const balance = 1000;

      const response = await global.api
        .post('/funds')
        .auth(global.authToken, { type: 'bearer' })
        .send({ name, currency: currencyCode, balance })
        .expect(200);

      console.log(response.body);

      expect(response.body.name).to.deep.equal(name);
      expect(response.body.currency).to.deep.equal(currencyCode);
      expect(response.body.balance).to.deep.equal(
        currency(balance, {
          symbol: getSymbolFromCurrency(currencyCode),
          precision: cc.code(currencyCode).digits,
        }).format()
      );
      expect(response.body.user_id).to.deep.equal(createdUserId);
    });
  });

  describe('PUT /funds/:fundId', () => {
    it('should require authorization', async () => {
      await global.api.put(`/funds/${createdFund.id}`).expect(401);
    });

    it('should update fund belonging to the user', async () => {
      const name = 'updated fund';
      const currencyCode = 'USD';
      const balance = 900;

      const response = await global.api
        .put(`/funds/${createdFund.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .send({ name, currency: currencyCode, balance })
        .expect(200);

      expect(response.body.name).to.deep.equal(name);
      expect(response.body.currency).to.deep.equal(currencyCode);
      expect(response.body.balance).to.deep.equal(
        currency(balance, {
          symbol: getSymbolFromCurrency(currencyCode),
          precision: cc.code(currencyCode).digits,
        }).format()
      );
      expect(response.body.user_id).to.deep.equal(createdUserId);
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

      await global.api
        .get(`/funds/${createdFund.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(404);
    });
  });
});
