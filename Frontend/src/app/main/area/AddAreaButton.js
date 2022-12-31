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
import { useAreasContext } from "../hooks/useAreasContext";

export default function FormDialog() {
  const { dispatch } = useAreasContext();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAreaHandler = async (e) => {
    e.preventDefault();

    const area = { code, name };

    const response = await fetch("http://localhost:3001/api/area/addArea", {
      method: "POST",
      body: JSON.stringify(area),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setCode("");
      dispatch({ type: "CREATE_AREA", payload: json });
      handleClose();
    }
  };

  return (
    <div>
      <Box aria-label="sticky">
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Area
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose} onSubmit={addAreaHandler}>
        <DialogTitle>Add Area</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            value={code}
            autoFocus
            margin="dense"
            id="code"
            label="Area Code"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <TextField
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Area Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addAreaHandler}>Add Area</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
