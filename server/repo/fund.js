const CustomError = require('../customError');
const db = require('../db');

async function get(userId) {
  return db('funds').where({ user_id: userId });
}

async function getById(fundId, userId) {
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
  return fund;
}

async function create(userId, body) {
  const createdFundId = (
    await db('funds').insert({
      name: body.name,
      balance: body.balance,
      user_id: userId,
    })
  )?.[0];

  return getById(createdFundId, userId);
}

async function update(fundId, userId, body) {
  getById(fundId, userId);
  await db('funds').where({ id: fundId }).update({
    name: body.name,
    balance: body.balance,
  });

  return getById(fundId, userId);
}

async function remove(fundId, userId) {
  getById(fundId, userId);
  return db('funds').where({ id: fundId }).del();
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
