const express = require('express');
const api = require('./api')
const router = express.Router();
const rs = require('randomstring');
const qs = require('querystring');

router.get('/login', async (req, res) => {
    console.log('/githublogin 처리 라우팅 - Github Login');
    const state = rs.generate();
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: "eaa4fc3429075f2b09ab",
        redirect_uri: "http://localhost:3001/login",
        state: state,
        scope: 'user:email',
    });
    const githubAuthUrl = url + query;
    res.send(githubAuthUrl)
});

module.exports = router;




