package com.vitvar.ctu.mdw.commons;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.bio.SocketConnector;
import org.eclipse.jetty.server.handler.AbstractHandler;

/**
 * The class creates Jetty HTTP listener that handles requests
 * by abstract handle method. Any class that extends this class only
 * implements the handle method to server HTTP requests.  
 */
public abstract class AbstractHttpListener extends AbstractHandler {

	/**
	 * Creates HTTP listener on a specified port
	 */
	public AbstractHttpListener(int port) throws Exception {
    	Server server = new Server();
    	
    	// this is the blocking I/O
    	SocketConnector connector = new SocketConnector();
    	connector.setPort(port);   	
        server.addConnector(connector);
       
        // set the handling class, this class implements handle method via 
        // the AbstractHandler class
        server.setHandler(this);
        
        // starts the server
        server.start(); server.join();
	}

	public abstract void handleRequest(HttpServletRequest request, 
			HttpServletResponse response) throws Exception;
	
	@Override
	public void handle(String target, Request baseRequest, HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		try {
			handleRequest(request, response);
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
	
	
}
