const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/userevent', async (req, res) => {
    console.log('/userevent 처리 라우팅')
    const paramId = req.query.id;
    const array = [];
    try {
        for(let page=1; page<8; page++) {
            console.log(page);
            const data = await api.fetchUserEventInfo(paramId, page);
            data.map((_data)=> {
                console.log(_data.type);
                // array.push(_data.type);
            })
        }
    } catch(e) {
        console.log(e);
        console.log("page 에러 만남");
    }
    res.json(array);
});

module.exports = router;




