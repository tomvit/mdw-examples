package com.vitvar.ctu.mdw;

import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.RMISecurityManager;
import java.rmi.server.UnicastRemoteObject;
import java.rmi.registry.LocateRegistry;
 
public class RMIServer extends UnicastRemoteObject implements HelloRMIInterface {
	
	private static final long serialVersionUID = 1L;
 
    public RMIServer() throws RemoteException {
    }

    // implementation of the interface method
    public int calculate(int a, int b) throws RemoteException {
    	return a+b;
    }
 
    // start the server and register the object in the rmi registry
    public static void main(String args[]) { 
    	try {
	        // install a security manager
	        if (System.getSecurityManager() == null) {
	        	RMISecurityManager sm = new RMISecurityManager();
	            System.setSecurityManager(sm);
	        }
	
	        // create rmi registry
	        LocateRegistry.createRegistry(1099); 
	 
	        // create remote object
	        RMIServer obj = new RMIServer();
	 
	        // Bind the object instance to the name "HelloRMI"
	        Naming.rebind("//0.0.0.0/HelloRMI", obj);
	        
	        System.out.println("RMI server started, listening to incoming requests...");
    	} catch (Exception e) {
    		System.out.println("Error occured: " + e.getLocalizedMessage());
    	}
    }
}