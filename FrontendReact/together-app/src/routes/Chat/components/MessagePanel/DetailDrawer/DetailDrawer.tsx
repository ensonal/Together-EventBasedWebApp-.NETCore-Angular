import { Drawer, Typography, Divider } from "@mui/material";
import { EventDrawer } from "./EventDrawer";
import { UserDrawer } from "./UserDrawer";

export function DetailDrawer({ drawerOpen, toggleDrawer, roomDetails }: any) {
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        style={{ width: 400, padding: 16 }}
      >
        <EventDrawer eventDetails={roomDetails?.eventDetails} />
        <Divider className="mt-3 mb-2" />
        <Typography variant="body1" fontWeight={"medium"}>
          Users in this room
        </Typography>
        {roomDetails?.chatRoomUsers?.map((user: any, index: number) => (
          <UserDrawer key={index} user={user} />
        ))}
      </div>
    </Drawer>
  );
}
