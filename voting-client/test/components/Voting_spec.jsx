import Voting from '../../src/components/Voting.jsx'
import ReactDOM from 'react-dom'
import {expect} from 'chai'
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils'
import React from 'react'
import {List} from 'immutable'


describe('Voting', ()=> {
    "use strict";
    it('renders a pair of buttons', ()=> {

        const component = renderIntoDocument(
            <Voting pair={['Superman', "Batman"]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Superman');
        expect(buttons[1].textContent).to.equal('Batman');
    });

    it('invokes the callback when a button is clicked', ()=> {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = renderIntoDocument(
            <Voting pair={['Superman', "Batman"]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);
        expect(votedWith).to.equal('Superman');
    });

    it('disable buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={["Batman", "Superman"]} hasVoted={'Batman'}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', ()=> {
        const component = renderIntoDocument(
            <Voting pair={["Batman", "Superman"]} hasVoted="Batman"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    })

    it('renders just the winner when there is one', ()=> {
        const component = renderIntoDocument(
            <Voting winner={"Batman"}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Batman');
    })

    it('Using a pure rendering mixin, should only renders as a pure component', ()=> {
        const pair = ['Batman', 'Superman'];
        const container = document.createElement('div');
        // render into a real element to trigger rerendering
        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Batman');

        pair[0] = 'Ironman';
        component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        // Should not change since it is just a pure rendering component
        expect(firstButton.textContent).to.equal('Batman');
    });

    it('does update DOM when prop changes', ()=> {
        const pair = List.of('Batman', 'Superman');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Batman');

        const newPair = pair.set(0, 'Ironman');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Ironman');

    })
});