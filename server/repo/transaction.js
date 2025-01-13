const CustomError = require('../customError');
const db = require('../db');
const { getById: getUserById } = require('./user');
const { getById: getFundsById } = require('./fund');
const { getById: getCategoryById } = require('./category');
const { updateBalance } = require('./fund');

async function get(userId) {
  try {
    await getUserById(userId); // Check if user exists

    return db('transactions')
      .innerJoin('funds', 'transactions.fund_id', 'funds.id')
      .innerJoin('categories', 'transactions.category_id', 'categories.id')
      .select(
        'transactions.*',
        'categories.name as category_name',
        'funds.name as fund_name',
        'funds.currency as fund_currency',
        'funds.user_id as fund_user_id'
      )
      .where('funds.user_id', userId);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function getById(transactionId, userId) {
  try {
    await getUserById(userId); // Check if user exists

    const transaction = await db('transactions')
      .innerJoin('funds', 'transactions.fund_id', 'funds.id')
      .innerJoin('categories', 'transactions.category_id', 'categories.id')
      .select(
        'transactions.*',
        'categories.name as category_name',
        'funds.name as fund_name',
        'funds.currency as fund_currency',
        'funds.user_id as fund_user_id'
      )
      .where('transactions.id', transactionId)
      .first();

    if (!transaction) {
      throw new CustomError(
        404,
        `Transaction with id ${transactionId} does not exist.`
      );
    }

    if (transaction.fund_user_id !== userId) {
      throw new CustomError(
        403,
        `Transaction with id ${transactionId} does not belong to user with id ${userId}.`
      );
    }

    return transaction;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, `Internal Server Error: ${error.message}`);
  }
}

async function create(userId, body) {
  try {
    await getFundsById(body.fund_id, userId); // Check if fund exists
    await getCategoryById(body.category_id); // Check if category exists

    const createdTransactionId = (
      await db('transactions').insert({
        amount: body.amount,
        description: body.description,
        fund_id: body.fund_id,
        category_id: body.category_id,
      })
    )?.[0];

    await updateBalance(body.fund_id, userId, body.amount);

    return getById(createdTransactionId, userId);
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
};
