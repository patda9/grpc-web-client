import {
  HelloRequest,
  HelloReply,
  RepeatHelloRequest,
} from "./_protobuf/helloworld_pb";
import { GreeterClient } from "./_protobuf/HelloworldServiceClientPb";

const clientHost = `http://${window.location.hostname}:${process.env.CLIENT_PORT}`;
const client = new GreeterClient(clientHost);

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
const streamRequest = new RepeatHelloRequest();
streamRequest.setName("Joestar");
streamRequest.setCount(5);

const stream = client.sayRepeatHello(streamRequest, {});

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
