const Joi = require('@hapi/joi');

module.exports = {
  0: {
    group: 'category',
    description: 'Get All Categories',
  },
  1: {
    path: {
      categoryId: Joi.number().integer().required(),
    },
    model: 'getCategoryDetails',
    group: 'category',
    description: 'Get Category Details',
  },
  2: {
    body: {
      name: Joi.string().required(),
    },
    model: 'createCategory',
    group: 'category',
    description: 'Create Category',
  },
  3: {
    path: {
      categoryId: Joi.number().integer().required(),
    },
    group: 'category',
    description: 'Delete Category',
  },
  4: {
    excludeFromSwagger: false,
  },
};
