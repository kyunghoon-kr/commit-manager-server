const express = require('express');
const commitRouter = require('./routes/commit');
const userinfoRouter = require('./routes/userinfo');
const userRouter = require('./routes/user');
const userEventRouter = require('./routes/userevent');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(cors());

app.use('/', commitRouter);
app.use('/', userinfoRouter);
app.use('/', userRouter);
app.use('/', userEventRouter);
app.listen(app.get('port'), () => { 
    console.log('익스프레스 서버를 시작합니다, Port : ' + app.get('port'));
});