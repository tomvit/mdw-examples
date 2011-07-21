/**
 * Example of a counter implemented using a stateful server in Node.js
 * Created for MDW CTU Course, 2011 
 * 
 * @author
 * Tomas Vitvar, http://vitvar.com
 * 
 * @License
 * MIT License
 */

var sessions = require("./sessions.js").sessions;
var http = require("http");

// create the http server, handle the request
http.createServer(function(req, res) {
    var session = sessions.getSession(req);
    
    // count number of hits from a single user
    if (session.data.counter)
        session.data.counter++;
    else
        // create the counter if it does not exist
        session.data.counter = 1;  

    // repeat the cookie in every response to keep the session
    // the max-age value is thus an inactivity interval
    res.writeHead(200, session.header);
    res.end("Number of hits from you: " + session.data.counter + "\n");
    
}).listen(process.env.C9_PORT, "0.0.0.0");
