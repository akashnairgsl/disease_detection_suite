import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import "./App.css";
import Level1 from "./Pages/Level1";
import Level2 from "./Pages/Level2";
import Level3 from "./Pages/Level3";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              style={{ marginRight: "30px" }}
            >
              <AllInclusiveIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Disease Detective Suite
            </Typography>
            <Stack direction="row" spacing={2} style={{ marginLeft: "auto" }}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "black",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: isActive ? "black" : "transparent",
                  // backgroundColor: isActive ? "inherit" : "transparent",
                  textDecoration: "none",
                  display: "inline-block",
                })}
              >
                Symptoms-Based
              </NavLink>
              <NavLink
                to="/level2"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "black",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: isActive ? "black" : "transparent",
                  // backgroundColor: isActive ? "inherit" : "transparent",
                  textDecoration: "none",
                  display: "inline-block",
                })}
              >
                Image-Based
              </NavLink>
              <NavLink
                to="/level3"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "black",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: isActive ? "black" : "transparent",
                  // backgroundColor: isActive ? "inherit" : "transparent",
                  textDecoration: "none",
                  display: "inline-block",
                })}
              >
                GenAI-Based
              </NavLink>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        <Route exact path="/" element={<Level1 />} />
        <Route exact path="/level2" element={<Level2 />} />
        <Route exact path="/level3" element={<Level3 />} />
      </Routes>
    </div>
  );
}

export default App;
