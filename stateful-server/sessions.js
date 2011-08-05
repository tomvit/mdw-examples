/**
 * simple session management object
 * Uses Set-Cookie and Cookie HTTP Headers to maintain session at the server
 * 
 * Created for MDW CTU Course, 2011 
 * 
 * @author
 * Tomas Vitvar, http://vitvar.com
 * 
 * @License
 * MIT License
 */

var sessions = {
    // property to hold all sessions from all clients
    sessions : {},

    // returns the session data based on the information in the cookie
    getSession : function(req) {
        var sid;

        // get the session id from the cookie
        if (req.headers.cookie && (p = req.headers.cookie.match(".*session-id=([a-zA-Z0-9]+).*")))
            sid = p[1];

        if (!sid || !this.sessions[sid])
            // create the session id md5 hash; maximum of 1000 connections 
            // from a single IP
            sid = require("crypto").createHash('md5').update(
                req.connection.remoteAddress + 
                    (Math.floor(Math.random()*999))).digest("hex");

        // return the session data; 
        // create the empty object if data does not exist
        return this.sessions[sid] || 
            (this.sessions[sid] = { id : sid, data : {},
                header: { "Set-Cookie" : "session-id=" + sid + "; Max-Age=3600" } });
    }
};

exports.sessions = sessions;