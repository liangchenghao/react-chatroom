import {fromJS} from 'immutable'
import {expect} from 'chai'

import {addRoom} from '../../src/server/actionCreater.js'
import {makeStore} from '../../src/server/store.js'

describe('server store', () => {
    it('dispatch action', (done) => {
        const mockState = fromJS({
            rooms: []
        })
        const store = makeStore(mockState)

        store.subscribe(() => {
            const state = store.getState();
            expect(state.get('rooms').size).to.equal(1);
            done();
        })

        store.dispatch(addRoom({
            name: '聊天室',
            owner: 'yangjiang'
        }))
    })
})