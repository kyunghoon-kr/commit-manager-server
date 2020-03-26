const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/commit 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    
    const date = api.getDate();
    let todayCommit = 0;
    await data.forEach((_data) => {
        if(_data.created_at.includes(date)) { // 문자열 포함 여부 검사
            todayCommit= todayCommit+1;
        }
    });
    const resData = {
        isCommited: `${todayCommit === 0 ? false : true}`,
        count: todayCommit,
        lastCommit: data[0].created_at.substring(0, 16)
    }
    res.json(resData);
});
// 미들웨어에서 파라미터 확인

module.exports = router;




