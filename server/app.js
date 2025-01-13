require('dotenv-safe').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const swagger = require('swagger-generator-koa');
const options = require('./config/swagger');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

app.use(require('./route/index').routes());
app.use(require('./route/user').routes());
app.use(require('./route/fund').routes());
app.use(require('./route/category').routes());

swagger.serveSwagger(app, '/swagger', options, {
  routePath: './route',
  requestModelPath: './requestModel',
  responseModelPath: './responseModel',
});

module.exports = app;
