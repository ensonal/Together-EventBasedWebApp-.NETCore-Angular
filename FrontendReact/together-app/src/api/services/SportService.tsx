import { get, post } from "../../api/axios";
import { Sport } from "../models/Sport";

export async function getAllSports() {
  const url = "/Sport/GetAllSports";
  const response = await get(url);
  return response as Sport[];
}
