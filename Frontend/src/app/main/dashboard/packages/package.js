import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OutlinedCard(props) {
  return (
    <Box sx={{ minWidth: 250 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              className="tracking-tight leading-6 truncate"
              color="text.secondary"
              variant="h5"
              component="div"
            >
              {props.name}
            </Typography>
            <Typography
              sx={{ fontSize: 11 }}
              color="text.secondary"
              gutterBottom
            >
              {props.type}
            </Typography>
            <br />
            <Typography
              className={`font-bold tracking-tight leading-none ${props.color}`}
              variant="h5"
              component="div"
            >
              {props.bandwidth + " MB/s"}
            </Typography>
            <br />
            <hr />
            <br />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Active Users:
            </Typography>
            <Typography color="text.secondary" variant="h5" component="div">
              {props.activeUsers}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
