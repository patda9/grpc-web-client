import {
  SequenceRequest,
  SequenceResponse,
  SquenceType,
} from "./_protobuf/sequences_pb.js";
import { SequencesServiceClient } from "./_protobuf/SequencesServiceClientPb";

const clientHost = `http://${window.location.hostname}:8880`;

const client = new SequencesServiceClient(clientHost);

// unary request
const requestCalculation = (termNumber: number,
                            calculationType: SquenceType) => {
  const unaryRequest = new SequenceRequest();
  unaryRequest.setTermNumber(termNumber);
  unaryRequest.setType(calculationType);

  const unaryRequestCallback = (e: any, response: SequenceResponse) => {
    if (e) {
      console.log(
        `Unexpected error for sequenceRequest: code = ${e.code}, message = "${e.message}"`
      );
    }
    else {
      console.log(response.getDataList());
    }
  };

  client.returnCalculationResult(unaryRequest, {}, unaryRequestCallback);
};

// streaming request
const requestCalculationStream = (termNumber: number,
                                  calculationType: SquenceType) => {
  const streamRequest = new SequenceRequest();
  streamRequest.setTermNumber(termNumber);
  streamRequest.setType(calculationType);

  const stream = client.streamCalculationResults(streamRequest, {});

  // send requests
  stream.on("data", (response: SequenceResponse) => {
    console.log(response.getDataList());
  });
  stream.on("error", (e: any) => {
    console.log(
      `Unexpected stream error: code = ${e.code}, message = "${e.message}"`
    );
  });
};

const requestCalculations = (termNumber: number,
                             calculationType: SquenceType) => {
  requestCalculation(termNumber, calculationType);
  requestCalculationStream(termNumber, calculationType);
}

requestCalculations(20, 0);