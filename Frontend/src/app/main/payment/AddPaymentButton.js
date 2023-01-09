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

export default function FormDialog() {
  const { dispatch } = usePaymentContext();
  const [open, setOpen] = React.useState(false);
  const [serialNo, setSerialNo] = React.useState("");
  const [paymentDate, setPaymentDate] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPaymentHandler = async (e) => {
    e.preventDefault();

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
            label="Date"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setPaymentDate(e.target.value);
            }}
          />
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
