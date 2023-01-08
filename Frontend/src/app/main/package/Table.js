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
import { usePackagesContext } from "../hooks/usePackagesContext";
import ActionIcons from "./ActionIcons/ActionIcons";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "monthlyFee",
    label: "Monthly Fee",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mbs",
    label: "Mbs",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 250,
    align: "center",
  },
];
export default function PackagesData() {
  const [rows, setRows] = React.useState([]);
  const { packages, dispatch } = usePackagesContext();

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
      const response = await fetch(
        "http://localhost:3001/api/package/getPackages"
      );
      const json = await response.json();
      if (response.ok) {
        console.log("response: ");
        console.log(json);
        dispatch({ type: "SET_PACKAGES", payload: json });
      }
    } catch (error) {
      setIsError(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    setRows(
      packages.map((obj) => ({ ...obj, actions: <ActionIcons obj={obj} /> }))
    );
  }, [packages]);

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
        <h1 style={{ padding: 20 }}>No Packages Found</h1>
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
              {rows &&
                rows
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
          count={packages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
