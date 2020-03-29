const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/userinfo', async (req, res) => {
    console.log('/userinfo 처리 라우팅')
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    
    try {
        const userInfo = {
            /// 프로필 사진 img url, 팔로워 수, 팔로잉 수를 받아온다. 
            imgSrc : data.avatar_url,
            following : data.following,
            follower : data.followers
        };
        let userName; // username이 존재할 경우 name, user는 존재하나 username이 존재하지 않을 경우 login 정보를 받아온다
        if(data.name!=null) { 
            userName = data.name;
        }
        else { 
            userName = data.login;
        }
        res.json({...userInfo, name: userName}); // SPREAD로 얇은 복사하여 보내기
    } catch(e) { console.log(e); res.json({ error: "unknown user" }); }
});

module.exports = router;




