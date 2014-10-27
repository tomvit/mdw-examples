package com.vitvar.ctu.mdw;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.vitvar.ctu.mdw.commons.AbstractHttpListener;

public class HttpListener extends AbstractHttpListener {
	 
	public HttpListener(int port) throws Exception {
		super(port);
	}

	/** handles the request when client connects **/
	public void handleRequest(HttpServletRequest request, 
			HttpServletResponse response) throws IOException, ServletException {
		
		// test if the host is company.cz
		if (request.getHeader("Host").equals("company.cz")) {
			response.setStatus(200);
			response.setHeader("Content-Type", "text/plain");
			response.getWriter().write("This is the response");
			response.flushBuffer();
		} else
			response.sendError(400); // bad request
	}
	
	/** starts the jetty http listener on port 8080 **/
	public static void main(String[] args) throws Exception {
		new HttpListener(8080);
	}
	
}
