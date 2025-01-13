const fundSchema = {
  id: {
    type: 'number',
  },
  name: {
    type: 'string',
  },
  currency: {
    type: 'string',
  },
  balance: {
    type: 'string',
  },
  user_id: {
    type: 'number',
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
  getFunds: {
    200: [fundSchema],
    401: errorSchema,
    500: errorSchema,
  },
  getFundDetails: {
    200: fundSchema,
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
  createFund: {
    200: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
      },
      balance: {
        type: 'number',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
      },
    },
    400: errorSchema,
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
  updateFund: {
    200: fundSchema,
    400: errorSchema,
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
  deleteFund: {
    200: {
      type: 'number',
    },
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
};
