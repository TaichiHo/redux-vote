import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=> {
    "use strict";
    it('handles SET_STATE', ()=> {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Batman', 'Superman'),
                    tally: Map({'Batman': 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {
                    'Batman': 1
                }
            }
        }));
    });

    it('handles SET_STATE with plain JS payload since server only send plain js object', ()=> {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Batman', 'Superman'],
                    tally: {
                        'Batman': 5
                    }
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {'Batman': 5}
            }
        }));
    });

    it('handles the SET_STATE action when given undefined state', ()=> {

        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Batman', 'Superman'],
                    tally: {
                        'Batman': 5
                    }
                }
            }
        };

        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {'Batman': 5}
            }
        }));
    });
    it('handles VOTE by setting hasVoted', ()=> {
        const state = fromJS({
            vote: {
                pair: ['Superman', 'Batman'],
                tally: {'Batman': 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Batman'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Superman', 'Batman'],
                tally: {Batman: 1}
            },
            hasVoted: "Batman"
        }));
    });
    it('does not set hasVoted for VOTE on invlaid entry', ()=> {
        const state = fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {Batman: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Ironman'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Batman', 'Superman'],
                tally: {Batman: 1}
            }
        }))
    })

    it('removes hasVoted on SET_STATE if pair changes', ()=> {
        const initialState = fromJS({
            vote: {
                pair: ['Batman', 'Ironman'],
                tally: {Batman: 1}
            },
            hasVoted: 'Batman'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Superman', 'Spiderman']
                }
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote:{
                pair:['Superman', 'Spiderman']
            }
        }))
    })
});