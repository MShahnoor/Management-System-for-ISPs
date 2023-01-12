import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewAction = (obj) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="fullscreen"
        size="medium"
        sx={{ marginLeft: 1 }}
        onClick={() => handleClickOpen()}
      >
        <FullscreenIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align={"left"}
                    style={{ minWidth: 100 }}
                  ></TableCell>
                  <TableCell
                    align={"left"}
                    style={{ minWidth: 250 }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>ID:</b>
                  </TableCell>
                  <TableCell>{obj.id.autoID + obj.id.areaCode.code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Name:</b>
                  </TableCell>
                  <TableCell>
                    {obj.id.firstName + " " + obj.id.lastName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Contact:</b>
                  </TableCell>
                  <TableCell>{obj.id.contact}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Package:</b>
                  </TableCell>
                  <TableCell>{obj.id.package.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Balance:</b>
                  </TableCell>
                  <TableCell>{obj.id.balance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Status:</b>
                  </TableCell>
                  <TableCell>
                    {obj.id.status == true ? "Active" : "Inactive"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <b>Address:</b>
                  </TableCell>
                  <TableCell>{obj.id.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewAction;
