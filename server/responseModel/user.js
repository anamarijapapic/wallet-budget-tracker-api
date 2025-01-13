const userSchema = {
  id: {
    type: 'number',
  },
  email: {
    type: 'string',
  },
  password: {
    type: 'string',
  },
  created_at: {
    type: 'string',
    format: 'date-time',
  },
  updated_at: {
    type: 'string',
    format: 'date-time',
  },
};

const errorSchema = {
  error: {
    type: 'string',
  },
};

module.exports = {
  getUsers: {
    200: [userSchema],
    401: errorSchema,
    500: errorSchema,
  },
  getUserDetails: {
    200: userSchema,
    401: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
  signup: {
    200: userSchema,
    500: errorSchema,
  },
  login: {
    200: {
      token: {
        type: 'string',
      },
    },
    401: errorSchema,
    500: errorSchema,
  },
};
