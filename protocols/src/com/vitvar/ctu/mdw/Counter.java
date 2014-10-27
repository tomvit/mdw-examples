package com.vitvar.ctu.mdw;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vitvar.ctu.mdw.commons.AbstractHttpListener;
import com.vitvar.ctu.mdw.commons.Sessions;

public class Counter extends AbstractHttpListener {

	private static Sessions<Integer> sessions = new Sessions<Integer>();

	public Counter(int port) throws Exception {
		super(port);
	}
	
	@Override
	public void handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// get the session id
		String sid = sessions.getSessionID(request);
		
		// create the new data if none exists
		if (sessions.getData(sid) != null)
			sessions.setData(sid, 
				Integer.valueOf(sessions.getData(sid).intValue() + 1));
		else
			sessions.setData(sid, Integer.valueOf(1));
		
		// send the response
		response.setStatus(200);
		response.setHeader("Set-Cookie", "session-id="+ sid + "; MaxAge=3600");
		response.setHeader("Content-Type", "text/plain");
		response.getWriter().write("Number of hits from you: " + 
			sessions.getData(sid).toString());
		response.flushBuffer();
	}

	public static void main(String args[]) throws Exception {
		new Counter(8080);
	}
		
}
