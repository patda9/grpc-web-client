import {
  HelloRequest,
  HelloReply,
} from "./_protobuf/helloworld_pb.js";
import { GreeterServiceClient } from "./_protobuf/HelloworldServiceClientPb";

const clientHost = `http://${window.location.hostname}:8880`;
console.log(clientHost);
const client = new GreeterServiceClient(clientHost);

// unary request
const unaryRequest = new HelloRequest();
unaryRequest.setName("Jonathan");

const unaryRequestCallack = (e: any, response: HelloReply) => {
  if (e) {
    console.log(
      `Unexpected error for sayHello: code = ${e.code}, message = "${e.message}"`
    );
  } else {
    console.log(response.getMessage());
  }
};

// streaming request
const streamRequest = new HelloRequest();
streamRequest.setName("Joestar");

const stream = client.itKeepsReplying(streamRequest, {});

// send requests
client.sayHello(unaryRequest, {}, unaryRequestCallack);

stream.on("data", (response: HelloReply) => {
  console.log(response.getMessage());
});
stream.on("error", (e: any) => {
  console.log(
    `Unexpected stream error: code = ${e.code}, message = "${e.message}"`
  );
});
