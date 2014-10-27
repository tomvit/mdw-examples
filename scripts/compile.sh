d=$pwd
cd $(dirname $0)

echo "* cleaning up the bin directory..."
rm -fr ../bin
mkdir -p ../bin

echo "* bulding protocols..."
CP="../libs/jetty-all-7.0.2.v20100331.jar:../libs/servlet-api-2.5.jar:../protocols/src:../Commons/src"
javac -cp $CP -d ../bin ../protocols/src/com/vitvar/ctu/mdw/SimpleProtocol.java
javac -cp $CP -d ../bin ../protocols/src/com/vitvar/ctu/mdw/Sessions.java
javac -cp $CP -d ../bin ../protocols/src/com/vitvar/ctu/mdw/HttpListener.java
javac -cp $CP -d ../bin ../protocols/src/com/vitvar/ctu/mdw/Counter.java
javac -cp $CP -d ../bin ../protocols/src/com/vitvar/ctu/mdw/AbstractHttpListener.java

echo "* building RMI client and server..."
CP="../RMITest/src"
javac -cp $CP -d ../bin ../RMITest/src/com/vitvar/ctu/mdw/RMIClient.java
javac -cp $CP -d ../bin ../RMITest/src/com/vitvar/ctu/mdw/RMIServer.java
javac -cp $CP -d ../bin ../RMITest/src/com/vitvar/ctu/mdw/HelloRMIInterface.java

echo "* building JMS producer and consumer"
CP="../jms/src:../libs/wlfullclient.jar:../lib/jms-1.1.jar"
javac -cp $CP -d ../bin ../jms/src/com/vitvar/ctu/mdw/JMSProducer.java
javac -cp $CP -d ../bin ../jms/src/com/vitvar/ctu/mdw/JMSConsumer.java

echo "done!"
echo ""

cd $d
