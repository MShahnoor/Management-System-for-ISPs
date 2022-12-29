import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import EmptyResponseIllustration from "../illustrations/empty";
import LoadingIllustration from "../illustrations/loading";
import ErrorIllustration from "../illustrations/error";

const columns = [
  { id: "code", label: "Area Code", minWidth: 190 },
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "activeUsers",
    label: "Active Users",
    minWidth: 180,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "streets",
    label: "Streets",
    minWidth: 180,
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

const ActionIcons = (id) => {
  return (
    <Stack direction="row" alignItems="center" paddingLeft={9} height={15}>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => {
          console.log(id);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ marginLeft: 1 }}
        onClick={() => {
          console.log(id);
        }}
      >
        <EditIcon />
      </IconButton>
    </Stack>
  );
};

export default function AreasData() {
  const [rows, setRows] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
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

  const getData = () => {
    setIsLoading(true);

    const url = "http://localhost:3001/getAreas";

    axios
      .get(url)
      .then((res) => {
        setRows(res.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    setAreas(
      rows.map((obj) => ({ ...obj, actions: <ActionIcons id={obj.id} /> }))
    );
  }, [rows]);

  React.useEffect(() => {
    getData();
  }, []);

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
  } else if (!areas.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ padding: 20 }}>No areas Found</h1>
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
              {areas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
