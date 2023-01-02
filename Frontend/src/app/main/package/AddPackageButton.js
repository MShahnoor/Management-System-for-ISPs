import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [monthlyFee, setMonthlyFee] = React.useState("");
  const [mbs, setMbs] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPackageHandler = () => {
    let url = "http://localhost:3001/api/package/addPackage";
    axios
      .post(url, { name: name, monthlyFee: monthlyFee, mbs: mbs })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box
        // sx={{ "& > :not(style)": { mb: 3 }, position: "absolute", right: 20 }}
        aria-label="sticky"
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Package
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="monthlyFee"
            label="monthlyFee"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setMonthlyFee(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mbs"
            label="mbs"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setMbs(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addPackageHandler}>Add Package</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
