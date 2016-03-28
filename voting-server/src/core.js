/**
 * Created by Taichi1 on 3/26/16.
 */

import {List,Map} from 'immutable'

export const INITIAL_STATE = Map();

// should be immutable map. but we don't really check here. Maybe we should, lol
export function setEntries(state, entries) {
    "use strict";
    // pass in the immutable list constructor to construct the list
    return state.set('entries', List(entries));
}

/**
 *
 * @param vote should be the vote state from the state tree
 * @returns {Array}
 */
function getWinner(vote) {
    "use strict";
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}
export function next(state) {
    const entries = state.get('entries').concat(getWinner(state.get('vote')));
    if (entries.size === 1) {
        // Why remove the original instead of building one state from scratch?
        // Because in the future we might have more irrelevant states in the state tree.
        // We don't want to change the next function everytime we modify the state structure
        // It is generally a good practice to always start from the old state
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

export function vote(voteState, entry) {
    // read into the state tree through vote->tally->entryName, if there is any missing key,
    // map will be created. If the value at the end is missing, initialize it with 0. Otherwise
    // apply the function

    // really great syntax by the way!
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    )

}