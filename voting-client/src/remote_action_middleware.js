/**
 * Created by Taichi1 on 3/28/16.
 */

export default store => next => action => {
    "use strict";
    console.log("Inside middleware");
    // by default should call this to actually invoke the action
    return next(action);
}