const express = require('express');
const commitRouter = require('./routes/commit');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use('/', commitRouter);
app.listen(app.get('port'), () => { 
    console.log('익스프레스 서버를 시작합니다, Port : ' + app.get('port'));
});