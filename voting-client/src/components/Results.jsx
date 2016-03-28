import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


// Just a placeholder

//export default React.createClass({
//    mixins: [PureRenderMixin],
//    render() {
//        "use strict";
//        return <div>Hello from results</div>
//    }
//});

export default React.createClass({
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
        return <div className="results">
            {
                this.getPair.map(entry =>
                    <div key={entry} className="entry">
                        <h1>{entry}</h1>
                        <div className="voteCount">
                            {this.getVotes(entry)}
                        </div>
                    </div>)
            }
        </div>;
    }
})