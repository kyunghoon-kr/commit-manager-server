const express = require('express');
const commitRouter = require('./routes/commit');
const usernameRouter = require('./routes/username');
const userRouter = require('./routes/user');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use('/', commitRouter);
app.use('/', usernameRouter);
app.use('/', userRouter);
app.listen(app.get('port'), () => { 
    console.log('익스프레스 서버를 시작합니다, Port : ' + app.get('port'));
});