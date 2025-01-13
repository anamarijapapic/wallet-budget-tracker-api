const CustomError = require('../customError');
const db = require('../db');
const { getById: getUserById } = require('./user');
const currency = require('currency.js');
const cc = require('currency-codes');
const getSymbolFromCurrency = require('currency-symbol-map');

async function get(userId) {
  try {
    await getUserById(userId); // Check if user exists

    const funds = await db('funds').where({ user_id: userId });

    // Format balance according to currency
    return funds.map((fund) => ({
      ...fund,
      balance: currency(fund.balance, {
        symbol: getSymbolFromCurrency(fund.currency),
        precision: cc.code(fund.currency).digits,
      }).format(),
    }));
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function getById(fundId, userId) {
  try {
    await getUserById(userId); // Check if user exists

    const fund = await db('funds').where({ id: fundId }).first();
    if (!fund) {
      throw new CustomError(404, `Fund with id ${fundId} does not exist.`);
    }

    if (fund.user_id !== userId) {
      throw new CustomError(
        403,
        `Fund with id ${fundId} does not belong to user with id ${userId}.`
      );
    }

    // Format balance according to currency
    fund.balance = currency(fund.balance, {
      symbol: getSymbolFromCurrency(fund.currency),
      precision: cc.code(fund.currency).digits,
    }).format();

    return fund;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function create(userId, body) {
  try {
    if (!cc.code(body.currency)) {
      throw new CustomError(400, `Currency ${body.currency} is not supported.`);
    }

    const createdFundId = (
      await db('funds').insert({
        name: body.name,
        currency: body.currency,
        balance: currency(body.balance).value,
        user_id: userId,
      })
    )?.[0];

    return getById(createdFundId, userId);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function update(fundId, userId, body) {
  try {
    if (!cc.code(body.currency)) {
      throw new CustomError(400, `Currency ${body.currency} is not supported.`);
    }

    await getById(fundId, userId); // Check if fund exists

    await db('funds')
      .where({ id: fundId })
      .update({
        name: body.name,
        currency: body.currency,
        balance: currency(body.balance).value,
      });

    return getById(fundId, userId);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function remove(fundId, userId) {
  try {
    await getById(fundId, userId); // Check if fund exists

    return db('funds').where({ id: fundId }).del();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function updateBalance(fundId, userId, amount) {
  try {
    const fund = await getById(fundId, userId); // Check if fund exists

    await db('funds')
      .where({ id: fundId })
      .update({
        balance: currency(fund.balance, {
          symbol: getSymbolFromCurrency(fund.currency),
          precision: cc.code(fund.currency).digits,
        }).add(amount).value,
      });

    return getById(fundId, userId);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateBalance,
};
