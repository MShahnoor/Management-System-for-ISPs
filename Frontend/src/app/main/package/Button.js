import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton() {
  return (
    <Box
      // sx={{ "& > :not(style)": { mb: 3 }, position: "absolute", right: 20 }}
      aria-label="sticky"
    >
      <Fab variant="extended" color="primary" aria-label="add">
        <AddIcon sx={{ mr: 1 }} />
        Add Package
      </Fab>
    </Box>
  );
}
