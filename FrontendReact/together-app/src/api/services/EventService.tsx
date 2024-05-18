import { get, post } from "../axios";
import { UserEvent } from "../models/UserEvent";

export async function addUserEvent(userEvent: UserEvent) {
  const url = "/Event/AddUserEvent";
  const response = await post(url, userEvent);
  return response;
}

export async function getUserEvents() {
  const url = "/Event/GetUserEvents";
  const response = await get(url);
  return response;
}

export async function deleteUserEvent(userEventId: number) {
  const url = `/Event/DeleteUserEvent/${userEventId}`;
  const response = await post(url);
  return response;
}

export async function getAllEvents() {
  const url = "/Event/GetAllEvents";
  const response = await get(url);
  return response;
}

export async function getEventById(eventId: number) {
  const url = `/Event/GetEventById/${eventId}`;
  const response = await get(url);
  return response;
}
