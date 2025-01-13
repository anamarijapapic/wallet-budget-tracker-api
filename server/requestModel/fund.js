const Joi = require('@hapi/joi');
const cc = require('currency-codes');

module.exports = {
  0: {
    group: 'fund',
    description: 'Get All Funds',
  },
  1: {
    path: {
      fundId: Joi.number().required(),
    },
    model: 'getFundDetails',
    group: 'fund',
    description: 'Get Fund Details',
  },
  2: {
    body: {
      name: Joi.string().required(),
      currency: Joi.string()
        .valid(...cc.codes())
        .required(),
      balance: Joi.number().precision(2).default(0).required(),
    },
    model: 'createFund',
    group: 'fund',
    description: 'Create Fund',
  },
  3: {
    path: {
      fundId: Joi.number().integer().required(),
    },
    body: {
      name: Joi.string().required(),
      currency: Joi.string()
        .valid(...cc.codes())
        .required(),
      balance: Joi.number().precision(2).default(0).required(),
    },
    model: 'updateFund',
    group: 'fund',
    description: 'Update Fund',
  },
  4: {
    path: {
      fundId: Joi.number().integer().required(),
    },
    group: 'fund',
    description: 'Delete Fund',
  },
  5: {
    excludeFromSwagger: false,
  },
};
