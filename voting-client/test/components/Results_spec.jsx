import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';
import {List,Map} from 'immutable';
import {expect} from 'chai';
import Results from '../../src/components/Results.jsx';

describe('Results', ()=> {
    "use strict";
    it('renders entries with vote counts or zero', ()=> {
        const pair = List.of('Batman', 'Superman');
        const tally = Map({'Batman': 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [batman, superman] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(batman).to.contain('Batman');
        expect(batman).to.contain(5);
        expect(superman).to.contain('superman');
        expect(superman).to.contain(0);
    });
    it('invokes the next callback when next button is clicked', ()=> {
        let nextInvoked = false;
        const next = ()=>nextInvoked = true;
        const pair = List.of('Batman', 'Superman');
        const component;
    })
});

