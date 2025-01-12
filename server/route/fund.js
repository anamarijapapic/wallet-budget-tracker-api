const Router = require('@koa/router');
const Joi = require('joi');
const validationMiddleware = require('../middleware/validate');
const fundRepo = require('../repo/fund');
const { validation } = require('swagger-generator-koa');
var requestModel = require('../requestModel/fund');
const authMiddlewareJwtCheck = require('../middleware/auth');

const router = new Router();

// GET /funds
router.get(
  '/funds',
  validation(requestModel[0]),
  authMiddlewareJwtCheck,
  async (ctx) => {
    const userId = ctx.state.user.id;
    ctx.body = await fundRepo.get(userId);
  }
);

// GET /funds/:fundId
router.get(
  '/funds/:fundId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    fundId: Joi.number().integer().required(),
  }),
  validation(requestModel[1]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const fundId = ctx.params.fundId;
    ctx.body = await fundRepo.getById(fundId, userId);
  }
);

// POST /funds
router.post(
  '/funds',
  authMiddlewareJwtCheck,
  validationMiddleware.body({
    name: Joi.string().required(),
    balance: Joi.number().precision(2).default(0.0).required(),
  }),
  validation(requestModel[2]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const body = ctx.request.body;
    ctx.body = await fundRepo.create(userId, body);
  }
);

// PUT /funds/:fundId
router.put(
  '/funds/:fundId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    fundId: Joi.number().integer().required(),
  }),
  validationMiddleware.body({
    name: Joi.string().required(),
    balance: Joi.number().precision(2).default(0.0).required(),
  }),
  validation(requestModel[3]),
  async (ctx) => {
    const fundId = ctx.params.fundId;
    const userId = ctx.state.user.id;
    const body = ctx.request.body;
    ctx.body = await fundRepo.update(fundId, userId, body);
  }
);

// DELETE /funds/:fundId
router.delete(
  '/funds/:fundId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    fundId: Joi.number().integer().required(),
  }),
  validation(requestModel[4]),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const fundId = ctx.params.fundId;

    ctx.body = await fundRepo.remove(fundId, userId);
  }
);

module.exports = router;
