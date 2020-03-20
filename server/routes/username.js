const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/username', async (req, res) => {
    console.log('/username 처리 라우팅')
    
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    res.send(data.name);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




