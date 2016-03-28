import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner.jsx'
import {connect} from 'react-redux'

// Just a placeholder

//export default React.createClass({
//    mixins: [PureRenderMixin],
//    render() {
//        "use strict";
//        return <div>Hello from results</div>
//    }
//});

export const Results =
    React.createClass({
        mixins: [PureRenderMixin],
        getPair() {
            "use strict";
            return this.props.pair || [];
        },
        getVotes(entry) {
            "use strict";
            if (this.props.tally && this.props.tally.has(entry)) {
                return this.props.tally.get(entry);
            }
            return 0;
        },
        render() {
            "use strict";
            return this.props.winner ?
                <Winner ref="winner" winner={this.props.winner}/> :
                <div className="results">
                    <div className="tally">
                        {
                            this.getPair().map(entry =>
                                <div key={entry} className="entry">
                                    <h1>{entry}</h1>
                                    <div className="voteCount">
                                        {this.getVotes(entry)}
                                    </div>
                                </div>)
                        }
                    </div>
                    <div className="management">
                        <button ref="next"
                                className="next"
                                onClick={this.props.next}>
                            Next
                        </button>
                    </div>
                </div>;
        }
    });

function mapStateToProps(state) {
    "use strict";
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    }
}
export const ResultsContainer = connect(mapStateToProps)(Results);