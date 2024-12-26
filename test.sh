#!/bin/sh

if [[ $(whoami) != "root" ]]; then
	echo "enter root session to run.";
	exit 1
fi

echo "preparing to run tests"

echo "restarting room api"
docker restart room_api

echo "flushing redis"
./commands/flush_redis.sh

echo "running tests"
(cd tests && npm start);
