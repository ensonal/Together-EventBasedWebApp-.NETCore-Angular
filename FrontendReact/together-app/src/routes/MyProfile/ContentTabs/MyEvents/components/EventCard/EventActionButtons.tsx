import React from "react";
import { Card, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteUserEvent } from "../../../../../../api/services/EventService";

export function EventActionButtons({ userEventId }: { userEventId: number }) {
  const handleDelete = () => {
    deleteUserEvent(userEventId);
  };

  return (
    <>
      <Card
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
          padding: 0,
        }}
        className="shadow rounded-3"
      >
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Card>
      <Card
        style={{
          position: "absolute",
          top: 8,
          left: 300,
          zIndex: 11,
          padding: 0,
        }}
        className="shadow rounded-3"
      >
        <IconButton color="primary" onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </Card>
    </>
  );
}
