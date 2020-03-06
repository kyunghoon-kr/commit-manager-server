const express = require('express');
const router = express.Router();

// Get Homepage

router.get('/', (req, res, next) => {
    res.render('index', { title : 'Express'})
})