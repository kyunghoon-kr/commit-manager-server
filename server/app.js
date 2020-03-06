const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => { 
    console.log('익스프레스 서버를 시작합니다, Port : ' + app.get('port'));
});