const Joi = require('@hapi/joi');

module.exports = {
  0: {
    group: 'user',
    description: 'Get All Users',
  },
  1: {
    path: {
      userId: Joi.number().required(),
    },
    model: 'getUserDetails',
    group: 'user',
    description: 'Get User Details',
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
