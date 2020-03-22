const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/user', async (req, res) => {
    console.log('/user 처리 라우팅')
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    try {
        if(data.name) {
            res.send(true);
        }
    } catch { res.send(false); }
});

module.exports = router;
