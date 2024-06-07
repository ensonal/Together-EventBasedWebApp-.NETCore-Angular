import { Divider } from "@mui/material";
import { RoomSearch } from "../components/RoomPanel/RoomSearch";
import { RoomGroupCard } from "../components/RoomPanel/RoomGroupCard";
import { useEffect, useState } from "react";
import { GetChatRooms } from "../../../api/services/ChatService";

export function RoomPanelContainer({ setRoomId }: any) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const response = await GetChatRooms();
      setRooms(response);
    }

    fetchRooms();
  }, []);

  return (
    <div className="d-flex flex-row justify-content-between w-100 h-100">
      <div className="d-flex flex-column p-2 gap-2 w-100">
        <RoomSearch />
        <div className="d-flex flex-column w-100">
          {rooms.map((room: any) => (
            <RoomGroupCard key={room.chatRoomId} room={room} setRoomId={setRoomId}/>
          ))}
        </div>
      </div>
      <Divider
        orientation="vertical"
        className="h-100"
        style={{ color: "#DEE2E6" }}
      />
    </div>
  );
}
