import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAreasContext } from "../../hooks/useAreasContext";
import * as React from "react";

const DeleteAction = (id) => {
  const { dispatch } = useAreasContext();

  const deleteAreaHandler = async ({ id }) => {
    console.log("received delete req.");
    console.log(id);
    const url = `http://localhost:3001/api/area/deleteArea/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_AREA", payload: json });
    }
  };

  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={() => deleteAreaHandler(id)}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default DeleteAction;
