import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MyAccount } from "./MyAccount/MyAccount";
import { MyEquipments } from "./MyEquipments/MyEquipments";
import { MySports } from "./MySports/MySports";

export default function MainContentTab() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            border: "1px solid rgba(0,0,0,0.12)",
          }}
          className="rounded-2"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Account" value="1" />
            <Tab label="My Sports" value="3" />
            <Tab label="My Equipments" value="4" />
            <Tab label="My Events" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, paddingBlockStart: 2 }}>
          <MyAccount />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0, paddingBlockStart: 2 }}>
          <MySports />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0, paddingBlockStart: 2 }}>
          <MyEquipments />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, paddingBlockStart: 2 }}>
          My Events
        </TabPanel>
      </TabContext>
    </Box>
  );
}
