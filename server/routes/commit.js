const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/commit 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    const date = api.getDate(new Date());
    console.log(date);
    let dateFormat = new Date(data[0].created_at);
    let count = 0;
    data.map((_data) => 
        _data.created_at.includes(date) ? count += 1 : _data
    );

    const resData = {
        count: count,
        lastCommit: `${api.getDate(dateFormat).replace(/-/gi, '')}${dateFormat.getHours()}${dateFormat.getMinutes()}`, // 표준 세계시 고려하여 포맷

    };
    res.json(resData);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




