const Joi = require('@hapi/joi');

module.exports = {
  0: {
    group: 'transaction',
    description: 'Get All Transactions',
  },
  1: {
    path: {
      transactionId: Joi.number().integer().required(),
    },
    model: 'getTransactionDetails',
    group: 'transaction',
    description: 'Get Transaction Details',
  },
  2: {
    body: {
      amount: Joi.number().precision(2).default(0).required(),
      description: Joi.string().optional(),
      fund_id: Joi.number().integer().required(),
      category_id: Joi.number().integer().required(),
    },
    model: 'createTransaction',
    group: 'transaction',
    description: 'Create Transaction',
  },
  3: {
    excludeFromSwagger: false,
  },
};
