import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useUsersContext } from "../../hooks/useUsersContext";

const EditAction = (obj) => {
  const { dispatch } = useUsersContext();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [firstName, setFirstName] = React.useState(obj.id.firstName);
  const [lastName, setLastName] = React.useState(obj.id.lastName);
  const [contact, setContact] = React.useState(obj.id.contact);
  const [packageType, setPackageType] = React.useState(obj.id.package);
  const [balance, setBalance] = React.useState(obj.id.balance);
  const [status, setStatus] = React.useState(obj.id.status);
  const [packages, setPackages] = React.useState([
    {
      value: "Basic",
      label: "Basic",
    },
    {
      value: "Hacker",
      label: "Hacker",
    },
    {
      value: "Premium",
      label: "Premium",
    },
    {
      value: "Standard",
      label: "Standard",
    },
  ]);
  const [statuses, setStatuses] = React.useState([
    {
      value: true,
      label: "Active",
    },
    {
      value: false,
      label: "Inactive",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editUserHandler = async (e) => {
    e.preventDefault();

    const user = {
      autoID: obj.id.autoID,
      areaCode: obj.id.areaCode,
      firstName,
      lastName,
      contact,
      package: packageType,
      balance,
      status,
      address: obj.id.address,
    };

    let url = `http://localhost:3001/api/user/editUser/${obj.id._id}`;
    console.log(url);

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "EDIT_USER", payload: { _id: obj.id._id, ...user } });
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
      <Dialog open={open} onClose={handleClose} onSubmit={editUserHandler}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            value={firstName}
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            value={lastName}
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            value={contact}
            autoFocus
            margin="dense"
            id="name"
            label="Contact"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                value={packageType}
                label="Package"
                variant="standard"
                onChange={(e) => {
                  setPackageType(e.target.value);
                }}
              >
                {packages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
          <TextField
            value={balance}
            autoFocus
            margin="dense"
            id="name"
            label="Balance"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setBalance(e.target.value);
            }}
          />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                value={status}
                label="Status"
                variant="standard"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={editUserHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAction;
