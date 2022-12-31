const express = require('express');
const server = require("./server");
const app = express();

server.start().then(() => {
    server.applyMiddleware({app});

    app.listen(4000, () => {
        console.log(`Skills Aggregator is running on port 4000`);
    });
});

process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', function(err) {
    console.log('Error: ' + err);
});



