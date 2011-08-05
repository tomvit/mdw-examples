#!/bin/bash

# set your server address here
SERVER_URL="http://mdw-examples.tomvit.cloud9ide.com"

# add an order and get the new location; assume everything went ok
order_uri=$SERVER_URL$(curl -v -X POST $SERVER_URL/orders 2>&1 | \
	awk '/Location/ {print $3}')

# remove whitespace
order_uri=${order_uri//[[:space:]]}

echo "New order with URI $order_uri has been created"

# add items to the order
curl -X POST -d "{ \"name\" : \"socks\", \"price\" : 5 }" $order_uri
curl -X POST -d "{ \"name\" : \"t-shirt\", \"price\" : 20  }" $order_uri
curl -X POST -d "{ \"name\" : \"jumper\", \"price\" : 45  }" $order_uri

# close the order
curl -X PUT -d "{ \"status\" : \"close\" }" $order_uri

# list the items in the order and the order's status
curl $order_uri
echo ""


