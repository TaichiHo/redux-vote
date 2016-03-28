import React from 'react';
import {List, Map} from 'immutable';


export default React.createClass({
    render(){
        return (
            <div>
                <div><h2>Common Header</h2></div>
                {
                    this.props.children
                }
                <div><h2>Common footer</h2></div>
            </div>
        )
    }
})