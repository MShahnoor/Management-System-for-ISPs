import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingIllustration = () => {
  return (
    <Stack
      sx={{ width: "100%", color: "grey.500", paddingTop: 20 }}
      spacing={2}
    >
      <LinearProgress color="secondary" />
      <br />
      <LinearProgress color="success" />
      <br />
      <LinearProgress color="inherit" />
    </Stack>
  );
};

export default LoadingIllustration;
