/**
 * Created by Taichi1 on 3/26/16.
 */

import Server from 'socket.io';

export default function startServer(store) {
    "use strict";
    const io = new Server().attach(8090);

    // This will introduce a lot of overheads since we push the entire
    // state to the clients everytime it updates.
    // Probably should only push the diffs to the client

    store.subscribe(
        ()=> {
            io.emit('state', store.getState().toJS());
        }
    );

    // When the client firstly connects, we also send out the current state
    io.on('connection', (socket)=> {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    })
}