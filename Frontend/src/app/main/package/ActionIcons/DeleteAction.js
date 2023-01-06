import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePackagesContext } from "../../hooks/usePackagesContext";
import * as React from "react";

const DeleteAction = (id) => {
  console.log({ id }, "id from deletemanager");
  const { dispatch } = usePackagesContext();
  console.log(id);

  const deletePackageHandler = async ({ id }) => {
    console.log("received delete req.");
    console.log(id);
    const url = `http://localhost:3001/api/package/deletePackage/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(url);
    if (response.ok) {
      dispatch({ type: "DELETE_PACKAGE", payload: json });
    }
    console.log(response);
  };

  return (
    <IconButton
      aria-label="delete"
      size="small"
      onClick={() => deletePackageHandler(id)}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default DeleteAction;
