#!/bin/sh
# Simple protocol start up script

# set the base path
EXAMPLES_HOME="$(dirname $0)/.."
CP="$EXAMPLES_HOME/bin:$EXAMPLES_HOME/libs/wlfullclient.jar:$EXAMPLES_HOME/libs/jms-1.1.jar"
java -cp $CP com.vitvar.ctu.mdw.JMSConsumer $*
