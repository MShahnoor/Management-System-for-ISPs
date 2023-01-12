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
import { usePackagesContext } from "../../hooks/usePackagesContext";

const EditAction = (obj) => {
  const { dispatch } = useUsersContext();
 // const { packages , dispatch: packagesDispatch } = usePackagesContext();
  //const { packages , setPackages } = React.useState([{_id: 34, name:"Temp"}]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [firstName, setFirstName] = React.useState(obj.id.firstName);
  const [lastName, setLastName] = React.useState(obj.id.lastName);
  const [contact, setContact] = React.useState(obj.id.contact);
  const [packageId, setPackageId] = React.useState(obj.id.package);
  const [balance, setBalance] = React.useState(obj.id.balance);
  const [status, setStatus] = React.useState(obj.id.status);
  const [packages, setPackages] = React.useState([
    {
      _id: "Basic",
      name: "Basic",
    },
    {
      _id: "Hacker",
      name: "Hacker",
    }
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

  const handleClickOpen = async() => {
    
    try {
      const response = await fetch(
        "http://localhost:3001/api/package/getPackages"
      );
      const json = await response.json();
      if (response.ok) {

       // packagesDispatch({ type: "SET_PACKAGES", payload: json });
       console.log("the json: ", json)
        setPackages(json)
        
        //console.log("PAckages Obj: ", packages)
      }
    } catch (error) {
      console.log(error.message);}
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // console.log(packages)
    // console.log(obj)
  };

  const editUserHandler = async (e) => {
    e.preventDefault();
    console.log("PAckahe id: ",packageId)
    const user = {
      autoID: obj.id.autoID,
      
      firstName,
      lastName,
      contact,
      package:  packageId,
      balance,
      status,
      address: obj.id.address,
    };
  

    let url = `http://localhost:3001/api/user/editUser/${obj.id._id}`;
    console.log(url);
    console.log(obj.id._id)
    console.log("user: ", user)
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    

    if (!response.ok) {
      setError(json.error.message);
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
                value={packageId}
                label="Package"
                variant="standard"
                onChange={(e) => {
                console.log(e.target)  
                setPackageId(e.target.value);
                  
                }}
              >
                {packages.map((option) => (
                  <MenuItem key={option._id} value={option} >
                    {option.name}
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
