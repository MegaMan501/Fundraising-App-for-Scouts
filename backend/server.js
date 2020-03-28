// require('dotenv').config();
const http = require("http");
const app = require("./app");
const debug = require("debug")("node-backend");

// Get the port
const getPort = val => {
    var port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// Catch the errors
const onError = err => {
    if(err.syscall !== "listen") {
        throw err;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (err.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges!");
            process.exit(1);
            break;
        case "EADDRINUSE": 
            console.error(bind + " is already in use!");
            process.exit(1);
            break;
        default:
            throw err;
    }
}

// On what port is the server listening
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string " ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
}

// Set the port
const port = getPort(process.env.PORT || "3020");
app.set("port", port);

// create the http server
const server = http.createServer(app);
server.on("error", onError);
server.on("listen", onListening);
server.listen(port);