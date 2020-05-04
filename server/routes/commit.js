const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/commit 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    const date = api.getDate(new Date());
    let dateFormat = new Date(data[0].created_at);
    let count = 0;
    data.map((_data) => 
        _data.created_at.includes(date) ? count += 1 : _data
    );

    const resData = {
        count: count,
        lastCommit: `${api.getDate(dateFormat).replace(/-/gi, '')}${dateFormat.getHours()+9}${dateFormat.getMinutes()}`, // 표준 세계시 고려하여 포맷
        repository: data[0].repo.name,
        // msg: data[0].payload.commits[0].message
    };
    res.json(resData);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




