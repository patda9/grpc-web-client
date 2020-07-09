#!/bin/bash

ROOT_DIR="${PWD}/.."

echo $ROOT_DIR

docker run -d --name grpc-web-envoy -v ${ROOT_DIR}/envoy.yaml:/etc/envoy/envoy.yaml:ro --network=host envoyproxy/envoy:v1.15.0

cd ..

python3 -m http.server 8881
