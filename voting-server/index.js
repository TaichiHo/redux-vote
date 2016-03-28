/**
 * Created by Taichi1 on 3/26/16.
 */

import makeStore from './src/store'
import startServer from './src/server'

// We can use this file as the entry point for node repl and play with the store
export const store = makeStore();
startServer(store);

// load some sample entries
store.dispatch({
    type: "SET_ENTRIES",
    entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});