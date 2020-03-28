const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/username', async (req, res) => {
    console.log('/username 처리 라우팅')
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    try {
        if(data.name!=null) { res.json({ name: data.name } )}
        else { res.json( { error: "username not found" })}
    } catch { res.json({ error: "unknown error" }); }
});

module.exports = router;




