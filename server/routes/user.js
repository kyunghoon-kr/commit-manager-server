const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/user', async (req, res) => {
    console.log('/user 처리 라우팅')
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchUserInfo(paramId, paramToken);
    if(data.name) {
        res.send(true);
    } else res.send(false);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




