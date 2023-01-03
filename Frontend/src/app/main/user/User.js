import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import UsersData from "./Table";
import FormDialog from "./AddUserButton";
import { UsersContextProvider } from "../context/UserContext";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function Users(props) {
  return (
    <UsersContextProvider>
      <Root
        content={
          <div
            className="p-24"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-end",
                paddingBottom: 10,
                paddingRight: 30,
              }}
            >
              <FormDialog />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 30,
              }}
            >
              <UsersData />
            </div>
          </div>
        }
        scroll="content"
      />
    </UsersContextProvider>
  );
}

export default Users;
