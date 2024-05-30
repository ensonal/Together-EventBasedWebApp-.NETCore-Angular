import { get, post } from "../axios";
import { EventFilters } from "../models/EventModels/EventFilters";
import { PaginationModel } from "../models/common/PaginationModel";

export async function addUserEvent(userEvent: any) {
  const url = "/Event/AddUserEvent";
  const response = await post(url, userEvent);
  return response;
}

export async function getUserEvents() {
  const url = "/Event/GetUserEvents";
  const response = await get(url);
  return response;
}

export async function getUserEventsByUserId(userId: string) {
  const url = `/Event/GetUserEventsByUserId/${userId}`;
  const response = await get(url);
  return response;
}

export async function deleteUserEvent(userEventId: number) {
  const url = `/Event/DeleteUserEvent/${userEventId}`;
  const response = await post(url);
  return response;
}

export async function getAllEvents(filters: EventFilters, pagination: PaginationModel) {
  const url = constructUrlWithFilters("/Event/GetAllEvents", filters, pagination);
  const response = await get(url);
  return response;
}

export async function getEventById(eventId: number) {
  const url = `/Event/GetEventById/${eventId}`;
  const response = await get(url);
  return response;
}

function constructUrlWithFilters(baseUrl: string, filters: any, pagination: any) {
  const queryParams = new URLSearchParams(filters).toString();
  const paginationParams = new URLSearchParams(pagination).toString();
  return `${baseUrl}?${queryParams}&${paginationParams}`;
}
