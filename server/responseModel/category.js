const categorySchema = {
  id: {
    type: 'number',
  },
  name: {
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
  getCategories: {
    200: [categorySchema],
    500: errorSchema,
  },
  getCategoryDetails: {
    200: categorySchema,
    404: errorSchema,
    500: errorSchema,
  },
  createCategory: {
    200: categorySchema,
    401: errorSchema,
    500: errorSchema,
  },
  deleteCategory: {
    200: {
      type: 'number',
    },
    401: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
};
