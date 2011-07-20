/**
 * simple application protocol in NodeJS
 * Created for MDW CTU Course, 2011 
 * 
 * @author
 * Tomas Vitvar, http://vitvar.com
 * 
 * @License
 * MIT License
 */

var net = require('net');

// creates the server and waits for incoming connection
var server = net.createServer(function (stream) {
    stream.write('Verbs: add a b, bye.\r\n');
 
    // event when new data in the socket is available
    stream.on('data', function (data) {
        // converts buffer to string, strip out the \r\n chars
        var message = new String(data.slice(0, data.length - 2));
        
        // checks for the correct format of the add message
        if (n = message.match("^add ([0-9]+) ([0-9]+)$"))
            stream.write("The result is: " + 
                (parseInt(n[1]) + parseInt(n[2])) + "\r\n");
        else
            if (message.match("^bye$")) stream.end("Goodbye!\r\n");
                else stream.write("Do not understand: " + message + "\r\n");    
    });
}).listen(9900, '0.0.0.0');                

