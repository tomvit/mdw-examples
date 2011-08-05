/**
 * Simple service for Node.JS.
 * stateful server implementing a simple public process
 * for opening, adding and closing order

 * 
 * Created for MDW CTU Course, 2011 
 * 
 * @author
 * Tomas Vitvar, http://vitvar.com
 * 
 * @License
 * MIT License
 */

var http = require("http");
var sessions = require("./sessions.js").sessions;

function processOrder(op, params, session) {
    var response = "", error;
    if (op == "open")
        if (session.data.open)
            error = "Order was already opened!\n";
        else {
            response = "Order was opened!\n";
            session.data.items = [];
            session.data.open = true;
        }
        
    if (op == "add")
        if (session.data.open) {
            if ((v = params.match(".*item=([0-9A-Za-z\-]+).*")) && v.length > 0) {
                session.data.items.push(v[1]);
                response = "Item added!";
            } else error = "Invalid format of the item!\n";
        } else error = "Order has not been opened!\n";
    
    if (op == "close")
        if (session.data.open) {
            for (var i = 0; i < session.data.items.length; i++)
                response += session.data.items[i] + "\n";
            session.data.open = false;
        } else error = "Order has not been opened!\n";

    return { response : response, error : error };
}

http.createServer(function(req, res) {
    // initi result and session
    var result, session = sessions.getSession(req);

    // get the operation name and process it
    if ((o = req.url.match("^.*/(open|add|close)(.*)$")))
        result = processOrder(o[1], o[2], session);
    else
        result = { error : "Not a valid operation!\n" };

    // create response headers
    var headers = session.header;
    headers["Content-Type"] = "text/plain";

    // write the result to the output stream
    if (result.error) {
        res.writeHead(400, headers);
        res.end(result.error);
    } else {
        res.writeHead(200, headers);
        res.end(result.response);
    }
    
}).listen(process.env.C9_PORT, '0.0.0.0');
