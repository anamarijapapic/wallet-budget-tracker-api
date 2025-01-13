const options = {
  title: 'Wallet Budget Tracker API',
  description: 'API documentation for Wallet Budget Tracker',
  version: '1.0.0',
  host: `localhost:${process.env.PORT}`,
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      description:
        'Example value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ Bearer: [] }],
  defaultSecurity: 'Bearer',
};

module.exports = options;
