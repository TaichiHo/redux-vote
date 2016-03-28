/**
 * Created by Taichi1 on 3/26/16.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import Results from './components/Results.jsx';

// Router related:
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';

const routes = (
    <Route component={App}>
        <Route path="/" component={Voting}/>
        <Route path="/results" component={Results}/>
    </Route>);


ReactDOM.render(
    //<Voting pair={pair} hasVoted="Superman"/>,
    //<Voting pair={pair} winner="Batman"/>,
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('app')
);
