/**
 * Created by Taichi1 on 3/28/16.
 */

export function setState(state) {
    "use strict";
    return {
        type: 'SET_STATE',
        state
    };
}

export function vote(entry) {
    "use strict";
    return {
        meta: {remote: true},
        type: 'VOTE',
        entry
    }
}