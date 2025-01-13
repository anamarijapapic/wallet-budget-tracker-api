const Router = require('@koa/router');
const Joi = require('joi');
const CustomError = require('../customError');
const authMiddlewareJwtCheck = require('../middleware/auth');
const validationMiddleware = require('../middleware/validate');
const { validation } = require('swagger-generator-koa');
const requestModel = require('../requestModel/transaction');
const transactionRepo = require('../repo/transaction');

const router = new Router();

// GET /transactions
router.get(
  '/transactions',
  authMiddlewareJwtCheck,
  validation(requestModel[0]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    if (!userId) {
      throw new CustomError(401, 'User not authenticated');
    }

    ctx.body = await transactionRepo.get(userId);
  }
);

// GET /transactions/:transactionId
router.get(
  '/transactions/:transactionId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    transactionId: Joi.number().integer().required(),
  }),
  validation(requestModel[1]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    if (!userId) {
      throw new CustomError(401, 'User not authenticated');
    }

    const transactionId = ctx.params.transactionId;

    ctx.body = await transactionRepo.getById(transactionId, userId);
  }
);

// POST /transactions
router.post(
  '/transactions',
  authMiddlewareJwtCheck,
  validationMiddleware.body({
    amount: Joi.number().precision(2).default(0).required(),
    description: Joi.string().optional(),
    fund_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
  }),
  validation(requestModel[2]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    if (!userId) {
      throw new CustomError(401, 'User not authenticated');
    }

    const body = ctx.request.body;

    ctx.body = await transactionRepo.create(userId, body);
  }
);

module.exports = router;
