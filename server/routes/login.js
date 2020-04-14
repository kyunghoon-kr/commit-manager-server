const express = require('express');
const api = require('./api')
const router = express.Router();
const rs = require('randomstring');
const qs = require('querystring');
const axios = require('axios');

let state; // 보안 절차를 위한 랜덤 코드
// let serverUrl = "http://ec2-18-223-112-230.us-east-2.compute.amazonaws.com:3001"; // 서버 url
let serverUrl = "http://localhost:3001"; // 로컬 테스트용 서버 url

router.get('/login', async (req, res) => {
    console.log('/login 처리 라우팅 - Github Login');
    state = rs.generate();
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: "eaa4fc3429075f2b09ab", // OAuth application client id
        redirect_uri: serverUrl + "/token", // 인증을 끝내고 리다이렉트 될 url
        state: state,
        scope: 'user:email',
    });
    const githubAuthUrl = url + query;
    res.redirect(githubAuthUrl);
});

router.get('/token', async (req, res) => {
    console.log('/token 처리 라우팅 - 인증 유효성 검사');

    const returncode = req.query.code;
    const returnstate = req.query.state;
    console.log(returnstate, returncode);
    if(state !== returnstate) {
        console.log(state + "\n" + returnstate);
        res.send(false); // 보안 통과 못한 경우
    }
    const host = 'https://github.com/login/oauth/access_token?'
    const queryString = qs.stringify({
        client_id: "eaa4fc3429075f2b09ab",
        client_secret: "8f631fa325d807b17f7f30522b162ccbe33f9e44",
        code: returncode,
        redirect_uri: serverUrl + "/token",
        state: state,
    })
    const authurl = host + queryString;
    axios.get(authurl)
    .then(function(resp) {
        const token = qs.parse(resp.data).access_token;
        console.log(token);
        res.redirect(serverUrl + "/githubuser?token=" + token)
    })
    .catch(function(err) {
        console.log(err);
    });
});

router.get('/githubuser', function(req, res) {
    console.log('/githubuser 처리 라우팅 - 유저 정보 얻어오기');
    console.log(req.query.token);
    
    const config = {
        headers: {
            Authorization: 'token ' + req.query.token,
            'User-Agent': 'Login-App'
        }
    }
    axios.get('https://api.github.com/user', config)
    .then(function(resp) {
        // res.json({
        //     id: resp.data.login,
        //     token: req.query.token
        // });
        res.redirect(serverUrl + `?token=${req.query.token}&id=${resp.data.login}`);
    })
    .catch(function(err) {
        console.log(err)
    })
});

module.exports = router;




