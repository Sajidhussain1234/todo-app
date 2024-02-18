import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function TodoUI() {
  return (
    <Container sx={{ textAlign: "center", marginTop: "94px" }}>
      <Typography variant="h2" component="div" gutterBottom>
        Welcome to the Todo App!
      </Typography>{" "}
      <Box style={{ marginTop: "20px", fontStyle: "italic" }}>
        Get things done with our amazing Todo App! <br />
        If you do not have account please sign up and get benefits.
      </Box>
    </Container>
  );
}
