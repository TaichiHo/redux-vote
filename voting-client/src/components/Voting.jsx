import React from 'react';
import Winner from './Winner.jsx';
import Vote from './Vote.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// still use the React.createClass syntax so that we can still use mixins
export default React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        "use strict";
        return <div>
            {this.props.winner ?
                <Winner ref="winner" winner={this.props.winner}/> :
                <Vote {...this.props}/>}
        </div>
    }
})