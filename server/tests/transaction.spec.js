const { expect } = require('chai');
const transactionRepo = require('../repo/transaction');
const currency = require('currency.js');
const cc = require('currency-codes');
const getSymbolFromCurrency = require('currency-symbol-map');

describe('Transaction Routes', () => {
  let createdTransaction;
  // Available in the seed and logged in via supertest
  const createdUserId = 3;
  // Available in the seed, belongs to the user
  const createdFundId = 3;

  before(async () => {
    createdTransaction = await transactionRepo.create(createdUserId, {
      amount: 123.45,
      description: 'My Transaction (Test)',
      fund_id: createdFundId,
      category_id: 1, // Available in the seed
    });
  });

  describe('GET /transactions', () => {
    it('should require authorization', async () => {
      await global.api.get('/transactions').expect(401);
    });

    it('should fetch all transactions that belong to the user', async () => {
      const response = await global.api
        .get('/transactions')
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      console.log(response.body);

      expect(response.body).to.be.an('array');
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        'id',
        'description',
        'amount',
        'fund_id',
        'category_id',
        'created_at',
        'updated_at',
        'category_name',
        'fund_name',
        'fund_currency',
        'fund_user_id',
      ]);
    });
  });

  describe('GET /transactions/:transactionId', () => {
    it('should require authorization', async () => {
      await global.api
        .get(`/transactions/${createdTransaction.id}`)
        .expect(401);
    });

    it('should fetch the transaction by id that belongs to the user', async () => {
      const response = await global.api
        .get(`/transactions/${createdTransaction.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      expect(response.body).to.deep.equal(createdTransaction);
    });
  });

  describe('POST /transactions', () => {
    it('should require authorization', async () => {
      await global.api.post(`/transactions`).expect(401);
    });

    it('should create a new transaction', async () => {
      const amount = -98.76;
      const description = 'My New Transaction (Test)';
      const fund_id = createdFundId;
      const category_id = 2; // Available in the seed

      // Get current fund balance
      const fundResponse = await global.api
        .get(`/funds/${createdFundId}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      console.log('Fund before transaction:', fundResponse.body);

      const currentBalance = fundResponse.body.balance;

      const response = await global.api
        .post('/transactions')
        .auth(global.authToken, { type: 'bearer' })
        .send({ amount, description, fund_id, category_id })
        .expect(200);

      console.log(response.body);

      expect(response.body.amount).to.deep.equal(amount);
      expect(response.body.description).to.deep.equal(description);
      expect(response.body.fund_id).to.deep.equal(fund_id);
      expect(response.body.category_id).to.deep.equal(category_id);

      // Check if the fund balance is updated
      const updatedFundResponse = await global.api
        .get(`/funds/${createdFundId}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      console.log('Fund after transaction:', updatedFundResponse.body);

      expect(updatedFundResponse.body.balance).to.deep.equal(
        currency(currentBalance, {
          symbol: getSymbolFromCurrency(fundResponse.body.currency),
          precision: cc.code(fundResponse.body.currency).digits,
        })
          .add(amount)
          .format()
      );
    });
  });
});
