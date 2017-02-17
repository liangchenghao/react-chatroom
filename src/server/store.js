import {createStore} from 'redux'
import coreReducer from './reducer.js'

import {fromJS} from 'immutable'

export const DEFAULT_STATE = fromJS({
    rooms: [
        {
            id: '0',
            name: '公开房间'
        }
    ]
})

export function makeStore(state = DEFAULT_STATE){
    return createStore(coreReducer, state);
}