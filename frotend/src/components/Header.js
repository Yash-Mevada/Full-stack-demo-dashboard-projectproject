// src/components/Header.js
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

const Header = ({ onLogout }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"))?.username;
    setName(data);
  }, []);
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Inventam Tech Solution Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={name}
            src="https://tse1.mm.bing.net/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&pid=Api"
            sx={{ marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {name}
          </Typography>
          <Button color="inherit" onClick={() => onLogout()}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
