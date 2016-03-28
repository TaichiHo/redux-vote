/**
 * Created by Taichi1 on 3/26/16.
 */

import{Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', ()=> {
    "use strict";
    it('handles the set_entries action', () => {
        const initState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Batman']};
        const nextState = reducer(initState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Batman']
        }));
    });

    it('handles Next', ()=> {
        const initState = fromJS({
            entries: ['Batman', 'Superman']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initState = fromJS({
            vote: {
                pair: ['Batman', 'Superman']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Batman'};
        const nextState = reducer(initState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {'Batman': 1}
            },
            entries: []
        }))
    });

    it('if given undefined as initial state should also work', ()=> {
        const action = {type: 'SET_ENTRIES', entries: ['Batman']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Batman']
        }));
    });
    it('can be used with reduce', ()=> {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Batman', 'Superman']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Batman'},
            {type: "VOTE", entry: 'Superman'},
            {type: 'VOTE', entry: 'Batman'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            winner: 'Batman'
        }));
    })
})