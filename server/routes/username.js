const express = require('express');
const api = require('./api')
const router = express.Router();
router.get('/username', async (req, res) => {
    console.log('/username 처리 라우팅')
    const paramId = req.query.id;
    const data = await api.fetchUserInfo(paramId);
    try {
        if(data.name)
            res.json({ name: data.name });
    } catch { res.json({ error: "username not found" }); }
});

module.exports = router;




