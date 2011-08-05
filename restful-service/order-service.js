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
var storage = { 
    orders : [], // list of all order in the storage
    
    // returns the next available id for the order
    getOrderSeqId : function() {
        return this.orders.length > 0 ?
            this.orders[this.orders.length - 1].id + 1 : 1;    
    },
    
    // returns an order object based on id
    getOrder : function(id) {
        for (var i = 0; i < this.orders.length; i++)
            if (this.orders[i].id == id)
                return this.orders[i];
        return null;
    },
    
    getItemSeqId : function(order) {
        return order.items.length > 0 ?
            order.items[order.items.length - 1].id + 1 : 1;    
    }

};

function processRequest(host, uri, method, data) {
    // orders resource
    if (uri == "/orders") {
        if (method == "POST") { // open order       
            // create a new order object
            var order = {   
                id : storage.getOrderSeqId(), 
                status : "open", 
                items : [] 
            };
            
            // add the order to the list of orders and return the result
            storage.orders.push(order);
            return { 
                status : "201", // created 
                headers : { Location: "http://" + host + "/orders/" + order.id } 
            };
        }
        
        else                 
            if (method == "GET") { // get list of all orders
                // TODO            
            } 
        
        else
            return { 
                status: "405", // method not allowed 
                headers : { "Allow" : "GET, POST" } 
            };
    }
    
    // orders/{order-id} resource
    if ((id = uri.match("^/orders/([0-9]+)$"))) {
        if (method == "POST") {
            // get the order object
            var order = storage.getOrder(id[1]);
            if (order && order.status == "open") {                
                // get the item object from the request data and set it's id
                var item = JSON.parse(data);
                item.id = storage.getItemSeqId(order);
                
                // store the item in the order and return the result
                // location is the URI of the newly created item
                order.items.push(item);
                return { 
                    status : "201", // created 
                    headers : { Location: "http://" + host + "/orders/" + order.id + "/" + item.id }                     
                };                
            } else
                // not found or bad request (the order is not open)
                return { status : (order ? "400" : "404") }; 
        }
        
        else        
            // update the order status
            if (method == "PUT") {
                // get the order object
                var order = storage.getOrder(id[1]);
                if (order && order.status == "open") {
                    var o2 = JSON.parse(data);
                    
                    // check for the valid status 
                    if (o2.status && (s = o2.status.match("(close)"))) {
                        order.status = s[1];
                        return { 
                            status : "204", // no content 
                        };                     
                    } else
                        // bad request
                        return { status : "400" };
                } else
                    // not found or bad request (the order is not open)
                    return { status : (order ? "400" : "404") }; 
            }
            
        else
            // get the order
            if (method == "GET") {
                // get the order object
                var order = storage.getOrder(id[1]);
                if (order)
                    // return the JSON representation of the order
                    return { status : "200", data : JSON.stringify(order) };
                else
                    // not found
                    return { status : "404" }; 
            }
            
        else
            // delete the order
            if (method == "DELETE") {
                // TODO
            }
        
        else            
            return { 
                status: "405", // method not allowed 
                headers : { "Allow" : "GET, PUT, POST, DELETE" } 
            };
    }
    
    // orders/{order-id}/{item-id} resource
    if ((id = uri.match("^/orders/([0-9]+)/([0-9]+)$"))) {
        // TODO: GET, DELETE
    }
    
}

http.createServer(function(req, res) {
    
    // initi the body to get the data asynchronously
    req.body = "";
    
    // get the data of the body
    req.on('data', function (chunk) {
        req.body += chunk;
    });

    req.on('end', function () {
        // process the request
        var result = processRequest(req.headers.host, 
            req.url, req.method, req.body);
        
        // send back the result
        res.writeHead(result.status ? result.status : "200", 
            result.headers ? result.headers : {});
        res.end(result.data ? result.data : null);
    });
    
}).listen(process.env.C9_PORT, '0.0.0.0');