import { UserEquipment } from "../models/UserEquipment";
import { get, post } from "../../api/axios";

export async function addUserEquipment(equipment: UserEquipment) {
  const url = "/Equipment/AddUserEquipment";
  const response = await post(url, equipment);
  return response as UserEquipment;
}

export async function getUserEquipments() {
  const url = "/Equipment/GetUserEquipments";
  const response = await get(url);
  return response as UserEquipment[];
}
