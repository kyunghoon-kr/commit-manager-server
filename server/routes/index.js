const express = require('express');
const commitRouter = require('./commit');
const userinfoRouter = require('./userinfo');
const userEventRouter = require('./userevent');
const loginRouter = require('./login');

const router = express.Router();
router.use('/', commitRouter);
router.use('/', userinfoRouter);
router.use('/', userEventRouter);
router.use('/', loginRouter);

router.get('/', (req, res, next) => {
    res.render('index', { title : 'Express'})
});

module.exports = router;