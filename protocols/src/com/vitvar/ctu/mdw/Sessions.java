package com.vitvar.ctu.mdw;

import java.security.MessageDigest;
import java.util.Hashtable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.vitvar.ctu.mdw.commons.Utils;

/** Class for the session management that uses HTTP cookies **/
public class Sessions<E> {
	
	// storage for the session data;
	private Hashtable<String, E> sessions = new Hashtable<String, E>();
	
	/** Returns session id based on the information in the http request **/
	public String getSessionID(HttpServletRequest request) throws Exception {
		String sid = null;
		
		// extract the session id from the cookie
		if (request.getHeader("cookie") != null) {
			Pattern p = Pattern.compile(".*session-id=([a-zA-Z0-9]+).*");
			Matcher m = p.matcher(request.getHeader("cookie"));
			if (m.matches()) sid = m.group(1);
		}
		
		// create the session id md5 hash; max 1000 connections per IP 
		if (sid == null || sessions.get(sid) == null) {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(new String(request.getRemoteAddr() + 
				Math.floor(Math.random()*999)).getBytes());
			sid = Utils.toHexString(md.digest());
		}
		return sid;
	}
	
	/** returns the session data based on a session id */
	public E getData(String sid) {
		return sessions.get(sid);
	}
	
	/** sets the session data for a specified session id */
	public void setData(String sid, E d) {
		sessions.put(sid, d);
	}
}
