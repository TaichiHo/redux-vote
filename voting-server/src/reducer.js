/**
 * Created by Taichi1 on 3/26/16.
 */
import {setEntries, next, vote, INITIAL_STATE} from './core'

// also set the initial state if not given or undefined
export default function reducer(state = INITIAL_STATE, action) {
    "use strict";
    // This shoule be the hub to figure out what action to take

    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            // reducer composition
            return state.update('vote',
                voteState => vote(voteState, action.entry));
    }
    return state;
}