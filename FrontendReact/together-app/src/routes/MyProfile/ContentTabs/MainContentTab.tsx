import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MyAccount } from './MyAccount/MyAccount';

export default function MainContentTab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Account" value="1" />
            <Tab label="My Events" value="2" />
            <Tab label="My Sports" value="3" />
            <Tab label="My Equipments" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><MyAccount /></TabPanel>
        <TabPanel value="2">My Events</TabPanel>
        <TabPanel value="3">My Sports</TabPanel>
        <TabPanel value="4">My Equipments</TabPanel>
      </TabContext>
    </Box>
  );
}