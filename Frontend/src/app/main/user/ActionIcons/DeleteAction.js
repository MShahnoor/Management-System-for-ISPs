import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUsersContext } from "../../hooks/useUsersContext";
import * as React from "react";

const DeleteAction = (id) => {
  const { dispatch } = useUsersContext();

  const deleteUserHandler = async ({ id }) => {
    console.log("userid: ");
    console.log(id);
    const url = `http://localhost:3001/api/user/deleteUser/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={() => deleteUserHandler(id)}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default DeleteAction;
