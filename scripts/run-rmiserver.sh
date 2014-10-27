#!/bin/sh
# http listener start up script 

# set the base path
EXAMPLES_HOME="$(dirname $0)/.."
CP="$EXAMPLES_HOME/bin:$EXAMPLES_HOME/libs/jetty-all-7.0.2.v20100331.jar:$EXAMPLES_HOME/libs/servlet-api-2.5.jar"
java -Djava.security.policy=server.policy -cp $CP com.vitvar.ctu.mdw.RMIServer

