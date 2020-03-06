const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/username', async (req, res) => {
    console.log('/result 처리 라우팅')
    
    const paramId = req.query.id;
    const paramToken = req.query.token;
    const data = await api.fetchUserInfo(paramId, paramToken);
    res.writeHead('200', {'Content-Type': 'text/html; charset=utf-8;'});
    res.write('<h1>익스프레스 서버에서 결과를 응답하였습니다.</h1>');
    res.write('<p>유저 이름 ' + data.name + '</p>');

    res.end();
});
// 미들웨어에서 파라미터 확인

module.exports = router;




