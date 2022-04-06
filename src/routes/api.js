const router = require('express').Router();

const apiCategoryRouter = require('./api/categoryRouter');

router.use('/category', apiCategoryRouter);

module.exports = router;