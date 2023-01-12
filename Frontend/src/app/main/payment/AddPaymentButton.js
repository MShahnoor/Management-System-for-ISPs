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
import { usePaymentContext } from "../hooks/usePaymentsContext";
import { useAreasContext } from "../hooks/useAreasContext";
import { useUsersContext } from "../hooks/useUsersContext";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from "@mui/material/MenuItem";

export default function FormDialog() {
  const { dispatch } = usePaymentContext();
  const {areas, dispatch: areasDispatch} = useAreasContext();
  const {users, dispatch: usersDispatch} = useUsersContext();

  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [areaId, setAreaId] = React.useState(null);
  const [serialNo, setSerialNo] = React.useState("");
  const [paymentDate, setPaymentDate] = React.useState(null);
  const [amount, setAmount] = React.useState("");

  const handleClickOpen = async() => {
    setOpen(true);
    
      try {
        console.log(typeof(dispatch))
        console.log(typeof(areasDispatch))
        const response = await fetch("http://localhost:3001/api/area/getAreas");
        const json = await response.json();
        if (response.ok) {
          areasDispatch({ type: "SET_AREAS", payload: json });
        }
      } catch (error) {
        
        console.log(error.message);
      } 


      try {
        const response = await fetch("http://localhost:3001/api/user/getUsers");
        const json = await response.json();
        if (response.ok) {
          usersDispatch({ type: "SET_USERS", payload: json });
        }
      } catch (error) {
        console.log(error.message);}
    
  };

  const handleClose = () => {
    setOpen(false);
    console.log(users)
  };

  const addPaymentHandler = async (e) => {
    e.preventDefault();
    userExists = false;
    // users.map((user)=> {
    //   if(user.autoID == userId && user.areaCode == )
    // })

    
    const payment = { serialNo, paymentDate, amount };

    const response = await fetch("http://localhost:3001/api/payment/addPayment", {
      method: "POST",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setSerialNo("");
      setPaymentDate("");
      setAmount("");
      dispatch({ type: "CREATE_PAYMENT", payload: json });
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
          Add Payment
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose} onSubmit={addPaymentHandler}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          
           
                  
          <TextField
                  id="outlined-select-currency"
                  select
                  value={areaId}
                  fullWidth
                  label="Area Code"
                  variant="standard"
                  onChange={(e) => {
                    setAreaId(e.target.value);
                  }}
                >
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.code}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
            value={userId}
            autoFocus
            margin="dense"
            id="userId"
            label="User ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />

          <TextField
            value={serialNo}
            autoFocus
            margin="dense"
            id="serialNo"
            label="Serial No"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSerialNo(e.target.value);
            }}
          />
          <TextField
            value={paymentDate}
            autoFocus
            margin="dense"
            id="paymentDate"
            label="Date : yyyy/mm/dd"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setPaymentDate(e.target.value);
            }}
          />
           {/*<DatePicker
              label="Payment Date"
              value={paymentDate}
              onChange={(newValue) => {
                setPaymentDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={params?.inputProps?.placeholder} />
              )}
            /> */}

            {/* <Controller
                name="end"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    renderInput={(_props) => (
                      <TextField label="End" className="mt-8 mb-16 w-full" {..._props} />
                    )}
                   
                  />
                )}
              /> */}
          <TextField
            value={amount}
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addPaymentHandler}>Add Payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
