import {
  AppBar,
  ButtonBase,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Logout, Person, Search, Folder } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "react-responsive";
import Login from "./Login";
import Profile from "./Profile";
import MyNotes from "./MyNotes";
import SearchNotes from "./SearchNotes";

const Dashboard = ({ userInfo, triggerSessionValidation }) => {
  let drawerWidth = 240;
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  //drawerWidth = isMobile ? 60 : 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selection, setSelection] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemSelected = (itemIndex) => {
    setMobileOpen(false);
    setSelection(itemIndex);
  };

  const selectDashboardTab = () => {
    switch (selection) {
      case 0:
        return <Profile userInfo={userInfo} />;
      case 1:
        return <SearchNotes />
      case 2: 
        return <MyNotes userInfo={userInfo}/>;
      default:
        return null;
    }
  };

  const logout = () => {
    window.localStorage.setItem("user-info", null);
    triggerSessionValidation();
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#E14D2A",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div color="inherit">
            <img
              src={"/images/fastudy-logo.png"}
              alt="Logo Fastudy"
              width="180"
              height="auto"
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <div style={{ height: "70px" }} />

        <List sx={{ paddingBottom: "200px" }}>
          <ListItem
            button
            selected={selection === 0}
            onClick={() => handleMenuItemSelected(0)}
            id="usersButton"
            sx={selection === 0 ? {color: '#E14D2A',
              '& .MuiListItemIcon-root': {
                color: '#E14D2A',
              }} : ''}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            selected={selection === 1}
            onClick={() => handleMenuItemSelected(1)}
            id="usersButton"
            sx={selection === 1 ? {color: '#E14D2A',
              '& .MuiListItemIcon-root': {
                color: '#E14D2A',
              }} : ''}
          >
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Search Notes" />
          </ListItem>
          <ListItem
            button
            selected={selection === 2}
            onClick={() => handleMenuItemSelected(2)}
            id="usersButton"
            sx={selection === 2 ? {color: '#E14D2A',
              '& .MuiListItemIcon-root': {
                color: '#E14D2A',
              }} : ''}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="My Notes" />
          </ListItem>
          <ListItem
            button
            onClick={() => logout()}
            id="usersButton"
            
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {selectDashboardTab()}
    </div>
  );
};

export default Dashboard;
