
od=$(pwd)
nd=$(dirname $0)/../libs

mkdir -p $nd
cd $nd

echo "* Downloading jetty v7.0.2..."
rm -f jetty-all-7.0.2.v20100331.jar
wget -q http://dist.codehaus.org/jetty/jetty-hightide-7.0.2/jetty-all-7.0.2.v20100331.jar

echo "* Downloading servlet API v2.5..."
rm -f servlet-api-2.5.jar
wget -q http://mirrors.ibiblio.org/pub/mirrors/maven2/javax/servlet/servlet-api/2.5/servlet-api-2.5.jar

echo "* Downloading jms API v1.1"
rm -f jms-1.1jar
wget -q https://repository.jboss.org/nexus/content/groups/public/javax/jms/jms/1.1/jms-1.1.jar

echo "* Downloading wlfullclient.jar"
rm -f wlfullclient.jar
wget -q http://mdw-infra.fit.cvut.cz/downloads/wlfullclient.jar

echo "Done!"
cd $od
