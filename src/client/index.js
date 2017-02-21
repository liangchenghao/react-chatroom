import {socket} from './io.js'

socket.on('state', state => {
    console.log('getInitialState:', state)
})