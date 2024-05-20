import { get, post } from "../axios";

export async function addFavoriteEvent(eventId: number) {
  const url = `Favorite/AddFavorite/${eventId}`;
  const response = await post(url);
  return response;
}

export async function getFavoriteEvents() {
  const url = "/Favorite/GetUserFavoriteEvents";
  const response = await get(url);
  return response;
}

export async function removeFromFavorites(eventId: number) {
  const url = `Favorite/RemoveFromFavorites/${eventId}`;
  const response = await post(url);
  return response;
}
