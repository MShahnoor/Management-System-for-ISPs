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
import { usePackagesContext } from "../hooks/usePackagesContext";

export default function FormDialog() {
  const { dispatch } = usePackagesContext();
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

  const addPackageHandler = async (e) => {
    e.preventDefault();

    const packages = { name, monthlyFee, mbs };

    const response = await fetch(
      "http://localhost:3001/api/package/addPackage",
      {
        method: "POST",
        body: JSON.stringify(packages),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setMonthlyFee("");
      setMbs("");
      dispatch({ type: "CREATE_PACKAGE", payload: json });
      handleClose();
    }
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
      <Dialog open={open} onClose={handleClose} onSubmit={addPackageHandler}>
        <DialogTitle>Add Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            value={monthlyFee}
            autoFocus
            margin="dense"
            id="monthlyFee"
            label="MonthlyFee"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setMonthlyFee(e.target.value);
            }}
          />
          <TextField
            value={mbs}
            autoFocus
            margin="dense"
            id="mbs"
            label="Mbs"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setMbs(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addPackageHandler}>Add Package</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
