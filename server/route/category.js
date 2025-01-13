const Router = require('@koa/router');
const Joi = require('joi');
const authMiddlewareJwtCheck = require('../middleware/auth');
const validationMiddleware = require('../middleware/validate');
const { validation } = require('swagger-generator-koa');
const requestModel = require('../requestModel/category');
const categoryRepo = require('../repo/category');

const router = new Router();

// GET /categories
router.get('/categories', validation(requestModel[0]), async (ctx) => {
  ctx.body = await categoryRepo.get();
});

// GET /categories/:categoryId
router.get(
  '/categories/:categoryId',
  validationMiddleware.params({
    categoryId: Joi.number().integer().required(),
  }),
  validation(requestModel[1]),
  async (ctx) => {
    const categoryId = ctx.params.categoryId;
    ctx.body = await categoryRepo.getById(categoryId);
  }
);

// POST /categories
router.post(
  '/categories',
  authMiddlewareJwtCheck,
  validationMiddleware.body({
    name: Joi.string().required(),
  }),
  validation(requestModel[2]),
  async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await categoryRepo.create(body);
  }
);

// DELETE /categories/:categoryId
router.delete(
  '/categories/:categoryId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    categoryId: Joi.number().integer().required(),
  }),
  validation(requestModel[3]),
  async (ctx) => {
    const categoryId = ctx.params.categoryId;
    ctx.body = await categoryRepo.remove(categoryId);
  }
);

module.exports = router;
