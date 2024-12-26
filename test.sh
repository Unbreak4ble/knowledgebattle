#!/bin/bash

if [[ $(whoami) != "root" ]]; then
	echo "enter root session to run.";
	exit 1
fi

echo "preparing to run tests"

echo "stopping running services (if exist)"
docker stop $(docker container ps -a -q);

echo "starting services"
./run.sh;

echo "giving services a breath time of 10 seconds"
sleep 10;

echo "flushing redis"
./commands/flush_redis.sh

echo "running tests"

cd tests && npm install && npm start;
test_signal=$?

echo "stopping services"
docker stop $(docker container ps -a -q);

echo "test finished"

exit $test_signal
