import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EmptyResponseIllustration from "../illustrations/empty";
import LoadingIllustration from "../illustrations/loading";
import ErrorIllustration from "../illustrations/error";
import { useUsersContext } from "../hooks/useUsersContext";
import ActionIcons from "./ActionIcons/ActionIcons";

const columns = [
  { id: "userID", label: "ID", minWidth: 120 },
  { id: "name", label: "Name", minWidth: 180 },
  {
    id: "package",
    label: "Package",
    minWidth: 130,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 160,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 250,
    align: "center",
  },
];
export default function UsersData() {
  const [rows, setRows] = React.useState([]);
  const [usersModified, setUsersModified] = React.useState([]);
  const { users, dispatch } = useUsersContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("http://localhost:3001/api/user/getUsers");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    } catch (error) {
      setIsError(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
   
    

    setUsersModified(
      rows.map((obj) => (
        {
        _id: obj._id,
        userID: obj.autoID + obj.areaCode.code,
        name: obj.firstName + " " + obj.lastName,
        package: obj.package.name,
        balance: obj.balance,
        status: obj.status == true ? "Active" : "Inactive",
        actions: obj.actions,
      }))
    );
  }, [rows]);

  React.useEffect(() => {
    setRows(
      users.map((obj) => ({ ...obj, actions: <ActionIcons obj={obj} /> }))
    );
  }, [users]);

  React.useEffect(() => {
    getData();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingIllustration />;
  } else if (isError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ padding: 20 }}>{error}</h1>
        <ErrorIllustration />
      </div>
    );
  } else if (rows && !rows.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ padding: 20 }}>No Users Found</h1>
        <EmptyResponseIllustration />
      </div>
    );
  } else {
    return (
      <Paper
        sx={{
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 418 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersModified &&
                usersModified
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            </>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
