const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/commit', async (req, res) => {
    console.log('/result 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchEvents(paramId, paramToken);
    res.writeHead('200', {'Content-Type': 'text/html; charset=utf-8;'});
    res.write('<h1>익스프레스 서버에서 결과를 응답하였습니다.</h1>');
    res.write('<p>이벤트 내용: ' + data[0].type + '</p>');
    res.write('<p>레포지토리: ' + data[0].repo.name + '</p>');
    res.write('<p>마지막 커밋 시간: ' + data[0].created_at + '</p>');

    res.end();
});
// 미들웨어에서 파라미터 확인

module.exports = router;




