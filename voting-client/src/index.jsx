/**
 * Created by Taichi1 on 3/26/16.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import {Voting, VotingContainer} from './components/Voting';
import {Results,ResultsContainer} from './components/Results.jsx';

import io from 'socket.io-client'

// Router related:
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';

// Redux related:
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';

import {setState} from './action_creators'

import remoteActionMiddleware from './remote_action_middleware';


// For medium or big app, connecting each of the router's components is usually a good idea

const routes = (
    <Route component={App}>
        <Route path="/" component={VotingContainer}/>
        <Route path="/results" component={ResultsContainer}/>
    </Route>);


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
    "use strict";
    store.dispatch(setState(state))
});


const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    //<Voting pair={pair} hasVoted="Superman"/>,
    //<Voting pair={pair} winner="Batman"/>,
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
