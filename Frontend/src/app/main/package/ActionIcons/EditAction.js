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
import { usePackagesContext } from "../../hooks/usePackagesContext";

const EditAction = (obj) => {
  const { dispatch } = usePackagesContext();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(obj.id.name);
  const [monthlyFee, setMonthlyFee] = React.useState(obj.id.monthlyFee);
  const [mbs, setMbs] = React.useState(obj.id.mbs);
  const handleClickOpen = () => {
    console.log("in edit function: ");
    console.log(obj);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editPackageHandler = async (e) => {
    e.preventDefault();

    const packageType = { name, monthlyFee, mbs };

    let url = `http://localhost:3001/api/package/editPackage/${obj.id._id}`;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(packageType),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({
        type: "EDIT_PACKAGE",
        payload: { _id: obj.id._id, ...packageType },
      });
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
      <Dialog open={open} onClose={handleClose} onSubmit={editPackageHandler}>
        <DialogTitle>Edit Package</DialogTitle>
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
            label="Package Name"
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
            label="Monnthly Fee"
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
          <Button onClick={editPackageHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAction;
