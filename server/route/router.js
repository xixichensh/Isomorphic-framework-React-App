import Router from 'koa-router';

const router = new Router();

//Index page route
router.get('/', require('../containers/index.js').index);

//set a router
module.exports = router.routes();
