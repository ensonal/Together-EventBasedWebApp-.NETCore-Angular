import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IncomingRequestCard } from "./IncomingRequest/IncomingRequestCard";
import { OutgoingRequestCard } from "./OutgoingRequest/OutgoingRequestCard";

export function EventRequestTab() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{
            backgroundColor: "white",
          }}
          className="rounded-3"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Incoming Requests" value="1" />
            <Tab label="Outgoing Requests" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, paddingBlockStart: 2 }}>
          <IncomingRequestCard />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, paddingBlockStart: 2 }}>
          <OutgoingRequestCard />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
