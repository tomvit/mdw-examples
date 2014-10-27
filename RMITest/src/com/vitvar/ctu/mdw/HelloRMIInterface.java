package com.vitvar.ctu.mdw;

import java.rmi.Remote;
import java.rmi.RemoteException;

// shared interface between a client and a server to
// invoke methods on the remote object
public interface HelloRMIInterface extends Remote {
    public int calculate(int a, int b) throws RemoteException;
}
