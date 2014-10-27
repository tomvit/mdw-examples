# ctrl-c to stop http listener
control_c() {
  echo -en "\n* Exiting\n"
  exit $?
}
trap control_c SIGINT
 
for (( ; ; ))
do
        echo -e "\n\n* Listening on port $1..."
        echo -e "\nHTTP/1.0 204 No Content\n\n" | nc -l $port
done
