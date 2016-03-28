/**
 * Created by Taichi1 on 3/26/16.
 */
import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core'

describe('application logic', ()=> {
    "use strict";

    describe('setEntries', ()=> {

        it('adds the entries to the state', ()=> {
            const state = Map();
            const entries = List.of(
                'Batman', 'Superman', 'Captain America'
            );
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Batman', 'Superman', 'Captain America')
            }))
        })
    })

    describe('next', ()=> {
        it('takes the next two entries under vote', ()=> {
            const state = Map({
                entries: List.of('Batman', 'Superman', 'Captain America')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Batman', 'Superman')
                }),
                entries: List.of('Captain America')
            }))
        });

        it('after vote, should put the winner of current vote back to entries', ()=> {
            const state = Map({
                vote: Map({
                    pair: List.of('Superman', 'Batman'),
                    tally: Map({
                        'Superman': 4,
                        'Batman': 5
                    })
                }),
                entries: List.of('Antman', 'Deadpool', 'Ironman')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Antman", 'Deadpool')
                }),
                entries: List.of('Ironman', 'Batman')
            }));
        });

        it('if tie, puts both from tied vote back to entries', ()=> {
            const state = Map({
                vote: Map({
                    pair: List.of("Batman", 'Superman'),
                    tally: Map({
                        Batman: 5,
                        Superman: 5
                    })
                }),
                entries: List.of('Antman', 'Deadpool', 'Ironman')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Antman', 'Deadpool')
                }),
                entries: List.of('Ironman', 'Batman', 'Superman')
            }))
        });

        it('Once there is only one entry left, we have a winner', ()=> {
            const state = Map({
                vote: Map({
                    pair: List.of('Batman', 'Superman'),
                    tally: Map({
                        Batman: 5,
                        Superman: 3
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Batman'
            }));
        });


    });

    describe('vote', ()=> {
        it('creates a tally for the voted entry', ()=> {
            // use composition here to avoid the vote function seeing the whole state tree
            const state = Map({
                pair: List.of("Batman", "Superman")

            });
            const nextState = vote(state, "Batman");
            expect(nextState).to.equal(Map({
                pair: List.of('Batman', "Superman"),
                tally: Map({
                    'Batman': 1
                })
            }));
        });
        it('adds to existing tally for the voted entry', ()=> {
            const state = Map({
                pair: List.of('Batman', "Superman"),
                tally: Map({
                    Batman: 4,
                    Superman: 3
                })
            });
            const nextState = vote(state, 'Batman');
            expect(nextState).to.equal(Map({
                pair: List.of('Batman', 'Superman'),
                tally: Map({
                    Batman: 5,
                    Superman: 3
                })
            }));
        })
    })
});