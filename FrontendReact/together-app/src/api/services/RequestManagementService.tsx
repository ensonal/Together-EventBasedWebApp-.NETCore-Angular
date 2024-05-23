import { get, post } from "../axios";

export async function sendRequestToJoinEvent(userId: string, eventId: number) {
  const request = {
    userId: userId,
    eventId: eventId,
  };
  const response = post("/requestmanagement/sendRequestToJoinEvent", request);
  return response;
}

export async function acceptRequestToJoinEvent(requestId: number) {
  const response = post(
    `/requestmanagement/acceptRequestToJoinEvent/${requestId}`
  );
  return response;
}

export async function rejectRequestToJoinEvent(requestId: number) {
  const response = post(
    `/requestmanagement/rejectRequestToJoinEvent/${requestId}`
  );
  return response;
}

export async function getIncomingRequest() {
  const response = get("/requestmanagement/getIncomingRequest");
  return response;
}

export async function getOutgoingRequest() {
  const response = get("/requestmanagement/getOutgoingRequest");
  return response;
}
