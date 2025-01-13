const transactionSchema = {
  id: {
    type: 'number',
  },
  description: {
    type: 'string',
  },
  amount: {
    type: 'number',
  },
  fund_id: {
    type: 'number',
  },
  category_id: {
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
  category_name: {
    type: 'string',
  },
  fund_name: {
    type: 'string',
  },
  fund_currency: {
    type: 'string',
  },
  fund_user_id: {
    type: 'number',
  },
};

const errorSchema = {
  error: {
    type: 'string',
  },
};

module.exports = {
  getTransactions: {
    200: [transactionSchema],
    401: errorSchema,
    500: errorSchema,
  },
  getTransactionDetails: {
    200: transactionSchema,
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
  createTransaction: {
    200: transactionSchema,
    401: errorSchema,
    403: errorSchema,
    500: errorSchema,
  },
  deleteTransaction: {
    200: {
      type: 'number',
    },
    401: errorSchema,
    403: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
};
