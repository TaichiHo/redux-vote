/**
 * Created by Taichi1 on 3/26/16.
 */

import {createStore} from 'redux'
import reducer from './reducer';

export default function makeStore() {
    "use strict";
    return createStore(reducer);
}