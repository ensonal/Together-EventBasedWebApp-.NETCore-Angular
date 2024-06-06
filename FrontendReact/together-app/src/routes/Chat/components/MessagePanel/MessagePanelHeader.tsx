import React, { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DetailDrawer } from "./DetailDrawer/DetailDrawer";
import { GetRoomDetails } from "../../../../api/services/ChatService";

export function MessagePanelHeader({ roomId }: any) {
  const [roomDetails, setRoomDetails] = useState<any>();
  const [memberCount, setMemberCount] = useState<any>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: any) => (event: any) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (!roomId) return;
    GetRoomDetails(roomId).then((response) => {
      setRoomDetails(response);
      setMemberCount(response?.chatRoomUsers?.length);
    });
  }, [roomId]);

  return (
    <div className="d-flex flex-column w-100 justify-content-start">
      <div className="d-flex flex-row justify-content-between align-items-center p-2 ps-3 pe-3 w-100">
        <div className="d-flex flex-column w-100">
          <Typography variant="body1" fontWeight="medium">
            {roomDetails?.roomTitle}
          </Typography>
          {memberCount > 0 ? (
            <Typography variant="body2">{memberCount} members</Typography>
          ) : null}
        </div>
        <InfoOutlinedIcon
          style={{ color: "#606060" }}
          onClick={toggleDrawer(true)}
        />
      </div>
      <Divider style={{ color: "#DEE2E6" }} />
      <DetailDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        roomDetails={roomDetails}
      />
    </div>
  );
}
