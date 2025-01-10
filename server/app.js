require('dotenv-safe').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.body = {
      err,
      message: err.message,
    };
  }
});

app.use(require('./route/index').routes());

module.exports = app;
