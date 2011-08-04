/**
 * Simple RESTful service for Node.JS.
 * opening, adding and closing order
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

// a storage to store the orders
// this should normally be persistent
var storage = { orders : [] };

// returns the next order id
function getOrderSeqId() {
    return storage.orders.length > 0 ?
        storage.orders[storage.orders.length - 1].id + 1 : 1;
}

function processRequest(uri, method, data) {
    if (uri == "/orders") {
        if (method == "POST") { // open order       
            // create a new order object
            var order = {   
                id : getOrderSeqId(), 
                status : "open", 
                items : [] 
            };
            
            // add the order to the list of orders and return the result
            storage.orders.push(order);
            return { 
                status : "204", // created 
                data : JSON.stringify(order),
                headers : { location: "/orders/" + order.id } 
            };
        }
        
        else                 
            if (metgod == "GET") { // get list of all orders
                // TODO            
            } 
        
        else
            return { 
                status: "405", // method not allowed 
                headers : { "Allow" : "GET, POST" } 
            };
    }
}

http.createServer(function(req, res) {
    // TODO    
}).listen(process.env.C9_PORT, '0.0.0.0');
