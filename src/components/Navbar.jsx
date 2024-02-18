import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit" sx={{ m: 0.5, fontWeight: "bold" }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
          <Button color="inherit" sx={{ m: 0.5, fontWeight: "bold" }}>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Signup
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
