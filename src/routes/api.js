const router = require('express').Router();

const middleware = require('./middleware');

const apiCategoryRouter = require('./api/categoryRouter');

const apiUserRouter = require('./api/userRouter');

router.use('/category', middleware.checkToken, apiCategoryRouter);

router.use('/user', apiUserRouter);

module.exports = router;