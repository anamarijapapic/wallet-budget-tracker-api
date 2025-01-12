const Joi = require('@hapi/joi');

module.exports = {
  0: {
    query: {},
    path: {},
    header: {},
    group: 'fund',
    description: 'Get All Funds',
  },
  1: {
    query: {},
    path: {
      fundId: Joi.number().required(),
    },
    header: {},
    model: 'getFundDetails',
    group: 'fund',
    description: 'Get fund details',
  },
  2: {
    body: {
      name: Joi.string().required(),
      balance: Joi.number().precision(2).default(0.0).required(),
    },
    model: 'create',
    group: 'fund',
    description: 'Create Fund',
  },
  3: {
    path: {
      fundId: Joi.number().integer().required(),
    },
    body: {
      name: Joi.string().required(),
      balance: Joi.number().precision(2).default(0.0).required(),
    },
    model: 'update',
    group: 'fund',
    description: 'Update Fund',
  },
  4: {
    path: {
      fundId: Joi.number().integer().required(),
    },
    model: 'delete',
    group: 'fund',
    description: 'Delete Fund',
  },
  5: {
    excludeFromSwagger: false,
  },
};
