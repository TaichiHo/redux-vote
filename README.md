# Voting application
This is a simple voting application for user to vote on several given movies. There can be several rounds. Each round different users
can vote on a unique pair of movies. The server will calculate the tally and then remove the losing one from the pool. 

#Redux, React, Webpack, Socket.io
In the client side, naturally we use Redux with React to be the stack. I also use React-Router to construct a basic routing solution. 
To communicate with the server, I also use a middleware to subscribe to each action and send a event to the server. 

In the server side, I also use the Redux style to hold the state. The socket io connection subscribes to the store change and emit 'state' event.

The whole application uses immutable.js as redux suggests.

# Reference
[Full stack Redux](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
