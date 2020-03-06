const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/result 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    const resData = {
        eventInfo: data[0].type,
        repository: data[0].repo.name,
        lastCommit: data[0].created_at
    };
    res.send(resData);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




