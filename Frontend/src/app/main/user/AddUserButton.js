import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import { useUsersContext } from "../hooks/useUsersContext";
import { usePackagesContext } from "../hooks/useUsersContext";

export default function FormDialog() {
  const { dispatch } = useUsersContext();
  const [open, setOpen] = React.useState(false);
  const [areaCode, setAreaCode] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [packageId, setPackageId] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [users, setUsers] = React.useState();
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
  const [areas, setAreas] = React.useState([
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "C",
      label: "C",
    },
    {
      value: "D",
      label: "D",
    },
  ]);

  const handleClickOpen = async() => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/package/getPackages"
      );
      const json = await response.json();
      if (response.ok) {
        setPackages(json)
      }
    } catch (error) {
      console.log(error.message);}

      try {
        const response = await fetch(
          "http://localhost:3001/api/area/getareas"
        );
        const json = await response.json();
        if (response.ok) {
          setAreas(json)
        }
      } catch (error) {
        console.log(error.message);}

        try {
          const response = await fetch(
            "http://localhost:3001/api/user/getUsers"
          );
          const json = await response.json();
          if (response.ok) {
            setUsers(json)
          }
        } catch (error) {
          console.log(error.message);}

    setOpen(true);
  }


  const handleClose = () => {
    setOpen(false);
  };

  const addUserHandler = async (e) => {
    e.preventDefault();

    let specificUsers = users.filter((a)=> a.areaCode.code == areaCode.code)
    let max = 0;
    for (let u in specificUsers){
      console.log(specificUsers[u].autoID)
      if(specificUsers[u].autoID > max){
        // console.log(u.autoID)
        max = specificUsers[u].autoID
      }
    }
    

    const user = {
      autoID:max+1,
      areaCode,
      firstName,
      lastName,
      contact,
      package: packageId,
      balance,
      status: true,
      address,
    };
console.log("User form addUserdialog", user)
    const response = await fetch("http://localhost:3001/api/user/addUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setAreaCode("");
      setFirstName("");
      setLastName("");
      setContact("");
      setPackageId("");
      setBalance("");
      setAddress("");
      dispatch({ type: "CREATE_USER", payload: json });
      try {
        const response = await fetch("http://localhost:3001/api/user/getUsers");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_USERS", payload: json });
        }
      } catch (error) {
        setIsError(true);
        setError(error.message);
      }
      handleClose();
    }
  };

  return (
    <div>
      <React.Fragment>
        <Box aria-label="sticky">
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add User
          </Fab>
        </Box>
        <Dialog
          open={open}
          fullWidth="true"
          maxWidth="sm"
          onClose={handleClose}
          onSubmit={addUserHandler}
        >
          <DialogTitle>Add User</DialogTitle>
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
                  value={areaCode}
                  fullWidth
                  label="Area Code"
                  variant="standard"
                  onChange={(e) => {
                    setAreaCode(e.target.value);
                  }}
                >
                  {areas.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.code}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
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
            <TextField
              value={address}
              autoFocus
              margin="dense"
              id="name"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={addUserHandler}>Add User</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
