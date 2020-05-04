const express = require('express');
const { getAppData } = require('../appdata')
const router = express.Router();
const fs = require('fs');
const rs = require('randomstring');
const qs = require('querystring');
const axios = require('axios');

let state; // 보안 절차를 위한 랜덤 코드

// 데이터 끌어다 사용하기
const {CLIENT_ID, CLIENT_SECRET, SERVER_URL} = getAppData();
// console.log(CLIENT_ID, CLIENT_SECRET, SERVER_URL);
router.get('/login', async (req, res) => {
    console.log('/login 처리 라우팅 - Github Login');
    state = rs.generate();
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: CLIENT_ID, // OAuth application client id
        redirect_uri: SERVER_URL + "/token", // 인증을 끝내고 리다이렉트 될 url
        state: state,
        scope: 'repo',
    });
    const githubAuthUrl = url + query;
    res.redirect(githubAuthUrl);
});

router.get('/token', async (req, res) => {
    console.log('/token 처리 라우팅 - 인증 유효성 검사');

    const returncode = req.query.code;
    const returnstate = req.query.state;
    // console.log(returnstate, returncode);
    if(state !== returnstate) {
        console.log(state + "\n" + returnstate+ "불일치");
        res.send(false); // 보안 통과 못한 경우
    }
    const host = 'https://github.com/login/oauth/access_token?'
    const queryString = qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: returncode,
        redirect_uri: SERVER_URL + "/token",
        state: state,
    })
    const authurl = host + queryString;
    axios.get(authurl)
    .then((resp) => {
        const token = qs.parse(resp.data).access_token;
        res.redirect(SERVER_URL + "/githubuser?token=" + token)
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/githubuser', (req, res) => {
    console.log('/githubuser 처리 라우팅 - 유저 정보 얻어오기');
    
    const config = {
        headers: {
            Authorization: 'token ' + req.query.token,
            'User-Agent': 'Login-App'
        }
    }

    // res.redirect(SERVER_URL + '/loginhtml');

    axios.get('https://api.github.com/user', config)
    .then((resp) => {
        // res.json({
        //     id: resp.data.login,
        //     token: req.query.token
        // });
        res.redirect(SERVER_URL + `/result?token=${req.query.token}&id=${resp.data.login}`);
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/result', (req, res) => {
    console.log('/result 처리 라우팅 - 유저 정보 얻어오기');
    const paramToken = req.query.token;
    const paramId = req.query.id;
    res.redirect(SERVER_URL + `/login.html?token=${paramToken}&id=${paramId}`);
    console.log(`Token : ${paramToken}\nId: ${paramId}`);
    res.end();
}); 

module.exports = router;




