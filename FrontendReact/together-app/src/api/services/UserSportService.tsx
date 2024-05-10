import { get, post } from "../axios";
import { Sport } from "../models/Sport";
import { SportExperience } from "../models/SportExperience";
import { UserSport } from "../models/UserSport";

export async function getAllSports() {
  const url = "/Sport/GetAllSports";
  const response = await get(url);
  return response as Sport[];
};

export async function getAllUserSports() {
  const url = "/Sport/GetAllUserSport";
  const response = await get(url);
  return response as UserSport[];
}

export async function deleteUserSport(userSportId: number) {
  const url = `/Sport/DeleteUserSport/${userSportId}`;
  const response = await post(url);
  return response;
}

export async function addUserSport(userSport: UserSport) {
  const url = "/Sport/AddUserSport";
  const response = await post(url, userSport);
  return response;
}

export async function getAllSportExperience() {
  const url = "/Sport/GetAllSportExperience";
  const response = await get(url);
  return response as SportExperience[];
}