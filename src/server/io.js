const DEFAULT_ROOM = '0';

export default function listenWebSocket(io, store){
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.emit('state', store.getState());

        //增加和删除房间的逻辑

        socket.on('disconnect', function(){
            console.log('user disconnected');
        })
    })
}