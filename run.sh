#!/bin/bash

echo "preparing to run"

mkdir -p database/{redis,mongo}

echo "looking for network interfaces";

service_net="infra-interface";
if [[ "$(docker network inspect $service_net)" == "[]" ]]; then
    docker network create --driver bridge $service_net;
    echo "virtual network set $service_net";
else
    echo "using virtual network $service_net";
fi

echo "initializing services";

docker compose -f "compose.yml" up -d --build;
