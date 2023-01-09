import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePaymentContext } from "../../hooks/usePaymentsContext";
import * as React from "react";

const DeleteAction = (obj) => {

  const { dispatch } = usePaymentContext();

  const deletePaymentHandler = async (id) => {
     
    console.log("received delete payment req.");
    console.log(id);
    const url = `http://localhost:3001/api/payment/deletePayment/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PAYMENT", payload: json });
    }
  };

  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={() => deletePaymentHandler(obj.id._id)}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default DeleteAction;
