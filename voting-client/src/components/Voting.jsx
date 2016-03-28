import React from 'react';
import Winner from './Winner.jsx';
import Vote from './Vote.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators'

// still use the React.createClass syntax so that we can still use mixins
export const Voting = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        "use strict";
        return <div>
            {this.props.winner ?
                <Winner ref="winner" winner={this.props.winner}/> :
                <Vote {...this.props}/>}
        </div>
    }
});

function mapStateToProps(state) {
    "use strict";
    return {
        // In reality, please draw a state diagram to do this.
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner'),
        hasVoted: state.get('hasVoted')
    };
}


export const VotingContainer = connect(
    mapStateToProps,
    actionCreators)
(Voting);