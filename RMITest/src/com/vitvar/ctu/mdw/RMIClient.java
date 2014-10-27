package com.vitvar.ctu.mdw;

import java.rmi.Naming;
 
public class RMIClient { 
	
    public static void main(String args[]) throws Exception {
        HelloRMIInterface o = (HelloRMIInterface)Naming.lookup("//localhost/HelloRMI");
        System.out.println(o.calculate(6, 4));
    }
}