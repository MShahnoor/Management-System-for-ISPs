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
import { usePaymentContext } from "../../hooks/usePaymentsContext";

const EditAction = (obj) => {
  const { dispatch } = usePaymentContext();
  const [open, setOpen] = React.useState(false);
  const [serialNo, setSerialNo] = React.useState(obj.id.serialNo);
  const [paymentDate, setPaymentDate] = React.useState(obj.id.paymentDate);
  const [amount, setAmount] = React.useState(obj.id.amount);
  const [error, setError] = React.useState(null);


  const handleClickOpen = () => {
    console.log("in edit func: ");
    console.log(obj);
    console.log(obj.id.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editPaymentHandler = async (e) => {
    e.preventDefault();
   

    const payment = { serialNo, paymentDate, amount };
    
    let url = `http://localhost:3001/api/payment/editPayment/${obj.id._id}`
    console.log(url)

    const response = await fetch(
      url,
      {
        method: "PATCH",
        body: JSON.stringify(payment),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setSerialNo("");
      setPaymentDate("");
      setAmount("");
      dispatch({ type: "EDIT_PAYMENT", payload: { id: obj.id._id, ...payment} });
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
      <Dialog open={open} onClose={handleClose} onSubmit={editPaymentHandler}>
        <DialogTitle>Edit Payment</DialogTitle>
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
              setName(e.target.value);
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
          <Button onClick={editPaymentHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default EditAction;