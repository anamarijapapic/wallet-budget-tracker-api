const Joi = require('@hapi/joi');

module.exports = {
  0: {
    query: {},
    path: {},
    header: {},
    group: 'user',
    description: 'Get All Users',
  },
  1: {
    query: {},
    path: {
      userId: Joi.number().required(),
    },
    header: {},
    model: 'getUserDetails',
    group: 'user',
    description: 'Get user details',
  },
  2: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    model: 'signup',
    group: 'user',
    description: 'Signup User',
  },
  3: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    model: 'login',
    group: 'user',
    description: 'Login User',
  },
  4: {
    excludeFromSwagger: false,
  },
};
