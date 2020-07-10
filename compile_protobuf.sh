#!/bin/bash

protoc -I=./protobuf helloworld.proto sequences.proto \
    --js_out=import_style=commonjs,binary:./_protobuf \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:./_protobuf