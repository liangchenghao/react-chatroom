import {expect} from 'chai'
import {v1} from 'uuid'
import {fromJS, Map, List} from 'immutable'

import {
    addRoom,
    removeRoom
} from '../../src/server/core.js'

describe('rooms', ()=>{

    //添加房间的测试
    it("能添加房间:addRoom", ()=>{
        var firstRoom = {
            name: 'first room',
            id: v1(),
            owner: "liangchenghao"
        };
        const nextState = addRoom(undefined, firstRoom);
        const rooms = nextState.get('rooms');
        expect(rooms).to.be.ok;
        expect(rooms.get(0)).to.equal(Map(firstRoom));

        const nextNextState = addRoom(nextState, {
            name: 'second room',
            owner: 'yangjiang'
        });
        expect(nextNextState.getIn(['rooms', 1, 'name'])).to.equal('second room');
    });

    //删除房间的测试
    const mockState = fromJS({
        rooms: [{
            name: 'first room',
            id: v1(),
            owner: "liangchenghao"
        }]
    });

    it('能被创建者删除', ()=>{
        const state = removeRoom(mockState, {
            id: mockState.getIn(['rooms', 0, 'id']),
            user: 'liangchenghao'
        });

        expect(state.get('rooms').size).to.equal(0);
    });

    it('不能被其他人删除', ()=>{
        const state = removeRoom(mockState, {
            id: mockState.getIn(['rooms', 0, 'id']),
            user: 'yangjiang'
        });

        expect(state.get('rooms').size).to.equal(1);
    })
});