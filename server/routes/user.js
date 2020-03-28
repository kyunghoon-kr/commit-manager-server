const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/user', async (req, res) => {
    console.log('/user 처리 라우팅')
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    try {
        if(data.login) {
            res.json( {isExist : true} )
        }
    } catch { res.json( {isExist : false} ); }
});

module.exports = router;
