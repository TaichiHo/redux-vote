/**
 * Created by Taichi1 on 3/26/16.
 */

/**
 Test out immutability. One of redux's beauties
 */

import {expect} from 'chai'
import {List,Map} from 'immutable'

describe('immutability', () => {
    "use strict";
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', ()=> {
            let state = 42;
            let nextState = increment(state);

            // This is what immutability is all about. Pure function!
            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        })
    })

    describe('A List', ()=> {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is Immutable', ()=> {
            let state = List.of("Batman vs Superman", "Deadpool", "Antman");
            let nextState = addMovie(state, "Captain America3");
            expect(nextState).to.equal(List.of(
                "Batman vs Superman", "Deadpool", "Antman", "Captain America3"
            ));
            expect(state).to.equal(List.of(
                "Batman vs Superman", "Deadpool", "Antman"
            ))
        });
    })

    describe("A map with keys", ()=> {
        function addMovie(currentState, movie) {
            return currentState.set(
                'movies',
                currentState.get('movies').push(movie)
            );
            // or can use something like this:
            // return currentState.update('movies', movies => movies.push(movie));
        }

        it('is Immutable', ()=> {
            let state = Map({
                movies: List.of("Batman vs Superman", "Deadpool", "Antman")
            });
            let nextState = addMovie(state, "Captain America3");

            expect(nextState).to.equal(Map({
                movies: List.of("Batman vs Superman", "Deadpool", "Antman",
                    "Captain America3")
            }));
            expect(state).to.equal(Map({
                movies: List.of("Batman vs Superman", "Deadpool", "Antman")
            }));
        })
    })
});