import {Map} from 'immutable';

export default function (state = Map(), action) {
    "use strict";
    switch (action.type) {
        case 'SET_STATE':
            return state.merge(action.state);
    }
    return state;
}