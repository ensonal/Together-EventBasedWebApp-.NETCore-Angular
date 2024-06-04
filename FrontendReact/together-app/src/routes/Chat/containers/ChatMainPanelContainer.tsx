import { Box, Grid } from "@mui/material";
import { MessagePanelContainer } from "./MessagePanelContainer";
import { RoomPanelContainer } from "./RoomPanelContainer";

export function ChatMainPanelContainer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} height={600} width="100%">
        <Grid item xs={3}>
          <RoomPanelContainer />
        </Grid>
        <Grid item xs={9} className="w-100">
          <MessagePanelContainer />
        </Grid>
      </Grid>
    </Box>
  );
}
