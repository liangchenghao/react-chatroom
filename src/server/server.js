import express from 'express'
import {Server} from 'http'

var app = express();
var http = Server(app);

//config
var rootPath = require('path').normalize(__dirname + '/../..');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(rootPath + '/public'));

//引入socket.io
var io = require('socket.io')(http);

import {makeStore} from './store.js'
import listenWebSocket from './io.js'

const store =makeStore();
listenWebSocket(io, store)
//监听连接、断开事件,很多逻辑通过socket.io发送，都在这处理会拥挤
/*io.on('connection', function(socket){
    console.log('a user connected')

    socket.on('disconnect', function(){
        console.log('user disconnected');
    })
})*/

app.get('/', (require, response) => {
    response.render('index');
})

http.listen(3000, () => {
    console.log('listening on port 3000');
})