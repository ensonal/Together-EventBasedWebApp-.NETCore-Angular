import React, { useState } from "react";
import { Divider, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DetailDrawer } from "./DetailDrawer";

export function MessagePanelHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    setDrawerOpen(open);
  };

  return (
    <div className="d-flex flex-column w-100 justify-content-start">
      <div className="d-flex flex-row justify-content-between align-items-center p-2 ps-3 pe-3 w-100">
        <div className="d-flex flex-column w-100">
          <Typography variant="body1" fontWeight="medium">
            Kaş Camping Meet
          </Typography>
          <Typography variant="body2">23 members, 10 online</Typography>
        </div>
        <InfoOutlinedIcon style={{color:'#606060'}} onClick={toggleDrawer(true)} />
      </div>
      <Divider style={{color:'#DEE2E6'}}/>
      <DetailDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
