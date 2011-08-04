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
        for (var i = 0; i < this.order.length; i++)
            if (this.orders[i] == id)
                return this.orders[i];
        return null;
    }

};

function processRequest(uri, method, data) {
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
                status : "204", // created 
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
    
    if ((id = uri.match("^/orders/([0-9]+)$"))) {
        if (method == "POST") {
            // get the order object
            var order = storage.getOrder(id);
            if (order) {                
                if (order.status == "open") {                
                    // get the item object from the request data and set it's id
                    var item = JSON.parse(data);
                    item.id = storage.getItemSeqId(order);
                    
                    // store the item in the order and return the result
                    // location is the URI of the newly created item
                    order.items.push(item);
                    return { 
                        status : "204", // created 
                        headers : { location: "/orders/" + order.id + "/" + item.id }                     
                    };                
                } else
                    return { status : "400" }; // bad request -> the order is not open
            } else
                return { status : "404" }; // order with specified id was not found
        }
    }
    
}

http.createServer(function(req, res) {
    // TODO    
}).listen(process.env.C9_PORT, '0.0.0.0');
