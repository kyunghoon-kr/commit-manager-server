const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/commit 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    const date = api.getDate(new Date());
    const todayEvent = [];
    let dateFormat = new Date(data[0].created_at);

    data.map((_data) =>  // 오늘 날짜의 PushEvent들만 걸러낸다.
        _data.created_at.includes(date) && _data.type == "PushEvent" ? todayEvent.push(_data) : _data
    );
    
    if(todayEvent.length) {
        const resData = {
            count: `${todayEvent.length >= 9 ? '9+' : todayEvent.length}`,
            lastCommit: `${api.getDate(dateFormat).replace(/-/gi, '')}${dateFormat.getHours()+9}${dateFormat.getMinutes()}`, // 표준 세계시 고려하여 포맷
            repository: todayEvent[0].repo.name,
            msg: todayEvent[0].payload.commits[0].message
        };
        res.json(resData);
    }
    else {
        res.json({
            count: 0
        })
    }
    
    
});

module.exports = router;




