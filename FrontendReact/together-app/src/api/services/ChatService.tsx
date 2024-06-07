import { get, post } from "../axios";

export async function GetChatRooms() {
  const url = "/Chat/GetChatRooms";
  const response = await get(url);
  return response;
}

export async function GetChatRoomMessages(roomId: string) {
  const url = `/Chat/GetChatRoomMessages/${roomId}`;
  const response = await get(url);
  return response;
}

export async function GetRoomDetails(roomId: string) {
  const url = `/Chat/GetRoomDetails/${roomId}`;
  const response = await get(url);
  return response;
}

export async function SendMessageToGroup(chatRoomId: number, content: string) {
  const url = "/Chat/SendMessage";
  const data = {
    ChatRoomId: chatRoomId,
    Content: content
  };
  const response = await post(url, data);
  return response;
}

export async function GetChatMessages(roomId: string) {
  const url = `/Chat/GetChatMessages/${roomId}`;
  const response = await get(url);
  return response;
}
