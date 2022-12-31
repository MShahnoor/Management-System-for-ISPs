import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditAction(obj) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(obj.id.name);
  const [code, setCode] = React.useState(obj.id.code);

  const handleClickOpen = () => {
    console.log("in edit func: ");
    console.log(obj);
    console.log(obj.id.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editAreaHandler = async (e) => {
    e.preventDefault();

    const area = { code, name };

    const response = await fetch(
      `http://localhost:3001/api/area/editArea/${obj.id.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(area),
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
      setCode("");
      // dispatch({ type: "CREATE_AREA", payload: json });
      handleClose();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ marginLeft: 1 }}
        onClick={() => handleClickOpen()}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} onSubmit={editAreaHandler}>
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
          <Button onClick={editAreaHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
