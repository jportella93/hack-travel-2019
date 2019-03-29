'use strict';
const Router = require('koa-router');

const router = new Router();
const flightsController = require('./flightsController')

router.get('/flights', async (ctx, next) => {
    let {dateFrom, dateTo, origins} = ctx.query;

    if (!dateFrom | !dateTo | !origins) {
      ctx.body = 'Error: missing parameters';
      ctx.status = 500;

    } else {
      origins = origins.split(',');
      ctx.body = await flightsController.getFlights(dateFrom, dateTo, origins)
      ctx.status = 200;
  }
});

module.exports = router;