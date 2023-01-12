import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RevenueCard(props) {
  return (
    <Box sx={{ minWidth: 250 }}>
      <Card
        variant=""
        style={{
          backgroundColor: "#1F2A3C",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <React.Fragment>
          <CardContent>
            <Typography
              className="tracking-tight leading-none text-white"
              sx={{ fontSize: 12, fontWeight: 500 }}
              component="div"
            >
              {props.title}
            </Typography>
            <br />
            <Typography
              className="font-bold tracking-tight leading-none text-white"
              variant="h5"
              component="div"
            >
              {props.figure}
            </Typography>
            <br />
            <Typography
              className="tracking-tight leading-none text-white"
              sx={{ fontSize: 12, fontWeight: 500 }}
              gutterBottom
            >
              {props.detail}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
