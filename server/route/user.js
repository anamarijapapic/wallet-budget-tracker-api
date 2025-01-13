const Router = require('@koa/router');
const Joi = require('joi');
const CustomError = require('../customError');
const authMiddlewareJwtCheck = require('../middleware/auth');
const validationMiddleware = require('../middleware/validate');
const { validation } = require('swagger-generator-koa');
const requestModel = require('../requestModel/user');
const userRepo = require('../repo/user');

const router = new Router();

// GET /users
router.get(
  '/users',
  authMiddlewareJwtCheck,
  validation(requestModel[0]),
  async (ctx) => {
    ctx.body = await userRepo.get();
  }
);

// GET /users/:userId
router.get(
  '/users/:userId',
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    userId: Joi.number().integer().required(),
  }),
  validation(requestModel[1]),
  async (ctx) => {
    const userId = ctx.params.userId;
    ctx.body = await userRepo.getById(userId);
  }
);

// POST /signup
router.post(
  '/signup',
  validationMiddleware.body({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  validation(requestModel[2]),
  async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await userRepo.create(body);
  }
);

// POST /login
router.post(
  '/login',
  validationMiddleware.body({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  validation(requestModel[3]),
  async (ctx) => {
    const { email, password } = ctx.request.body;

    const user = await userRepo.getByEmail(email);
    if (!user) {
      throw new CustomError(401, 'Wrong username or password.');
    }

    const passwordMatch = await userRepo.comparePasswords(
      password,
      user.password
    );
    if (!passwordMatch) {
      throw new CustomError(401, 'Wrong username or password.');
    }

    const token = userRepo.generateToken(user);
    ctx.body = { token };
  }
);

module.exports = router;
