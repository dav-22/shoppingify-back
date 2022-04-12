const router = require('express').Router();

const middleware = require('./middleware');

const apiCategoryRouter = require('./api/categoryRouter');

const apiUserRouter = require('./api/userRouter');

const apiItemRouter = require('./api/itemRouter');

router.use('/category', middleware.checkToken, apiCategoryRouter);

router.use('/item', middleware.checkToken, apiItemRouter);

router.use('/user', apiUserRouter);

module.exports = router;