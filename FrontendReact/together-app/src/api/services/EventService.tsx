import { get, post } from "../axios";
import { UserEvent } from "../models/UserEvent";

export async function addUserEvent(userEvent : UserEvent) {
    const url = "/Event/AddUserEvent";
    const response = await post(url, userEvent);
    return response;
}