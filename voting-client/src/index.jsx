/**
 * Created by Taichi1 on 3/26/16.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import {Voting, VotingContainer} from './components/Voting';
import {Results,ResultsContainer} from './components/Results.jsx';

// Router related:
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';

// Redux related:
import {createStore} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';

// For medium or big app, connecting each of the router's components is usually a good idea

const routes = (
    <Route component={App}>
        <Route path="/" component={VotingContainer}/>
        <Route path="/results" component={ResultsContainer}/>
    </Route>);

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Batman', 'Superman'],
            tally: {'Batman': 3}
        }
    }
});


ReactDOM.render(
    //<Voting pair={pair} hasVoted="Superman"/>,
    //<Voting pair={pair} winner="Batman"/>,
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
