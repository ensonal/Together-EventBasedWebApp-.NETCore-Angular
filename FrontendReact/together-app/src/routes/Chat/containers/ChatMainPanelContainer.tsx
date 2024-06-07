import { Box, Grid } from "@mui/material";
import { MessagePanelContainer } from "./MessagePanelContainer";
import { RoomPanelContainer } from "./RoomPanelContainer";
import { useState } from "react";

export function ChatMainPanelContainer() {
  const [roomId, setRoomId] = useState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} height={600} width="100%">
        <Grid item xs={3}>
          <RoomPanelContainer setRoomId={setRoomId}/>
        </Grid>
        <Grid item xs={9} className="w-100">
          <MessagePanelContainer roomId={roomId} />
        </Grid>
      </Grid>
    </Box>
  );
}
