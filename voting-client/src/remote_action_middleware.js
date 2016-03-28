/**
 * Created by Taichi1 on 3/28/16.
 */

// normally the applyMiddleware takes this form of function: store => next => action
// we wrap one more layer with socket
export default socket => store => next => action => {
    "use strict";
    //console.log("Inside middleware");
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    // by default should call this to actually invoke the action
    return next(action);
}