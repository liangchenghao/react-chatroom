import {expect} from 'chai'
import {v1} from 'uuid'
import {fromJS, Map, List} from 'immutable'

import coreReducer from '../../src/server/reducer.js'
import {addRoom, removeRoom} from '../../src/server/actionCreater.js'

describe('server端核心Reducer', () => {
    it('可以当作一个Reducer', () => {
        var id = v1();
        var actions = [
            {
                type: 'ADD_ROOM',
                room: {
                    id,
                    name: '1',
                    owner: 'liangchenghao'
                }
            },
            {
                type: 'ADD_ROOM',
                room: {
                    name: '2',
                    owner: 'yangjiang'
                }
            },
            {
                type: 'ADD_ROOM',
                room: {
                    id,
                    name: '3',
                    owner: 'liangchenghao'
                }
            },
            {
                type: 'REMOVE_ROOM',
                payload: {
                    id: id,
                    user: 'liangchenghao'
                }
            }
        ];
        const finalState = actions.reduce(coreReducer, undefined);

        expect(finalState.get('rooms').size).to.equal(2);
        expect(finalState.getIn(['rooms', 0, 'owner'])).to.equal('yangjiang');
    })

    it('使用actionCreater', () => {
        var id = v1();
        var actions = [
            addRoom({
                id,
                name: '1',
                owner: 'liangchenghao'
            }),
            addRoom({
                name: '2',
                owner: 'yangjiang'
            }),
            addRoom({
                name: '3',
                owner: 'liangchenghao'
            }),
            removeRoom({
                id: id,
                user: 'liangchenghao'
            })
        ];
        const finalState = actions.reduce(coreReducer, undefined);

        expect(finalState.get('rooms').size).to.equal(2);
        expect(finalState.getIn(['rooms', 0, 'owner'])).to.equal('yangjiang');
    })
})