import React from 'react';
import { Drawer, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

export function DetailDrawer({drawerOpen, toggleDrawer}: any) {
    return(
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          style={{ width: 350, padding: 16 }}
        >
          <Typography variant="h6">Event Information</Typography>
          <Typography variant="body2" gutterBottom>
            Details about the event...
          </Typography>
          <Divider />
          <Typography variant="h6" style={{ marginTop: 16 }}>Members</Typography>
          <List>
            {['User 1', 'User 2', 'User 3'].map((text, index) => (
              <ListItem button key={index}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    )
}