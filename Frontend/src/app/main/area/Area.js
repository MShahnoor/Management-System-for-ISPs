import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import AreasData from "./Table";
import FormDialog from "./AddAreaButton";
import { AreasContextProvider } from "../context/AreaContext";

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

function Areas(props) {
  return (
    <AreasContextProvider>
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
              <AreasData />
            </div>
          </div>
        }
        scroll="content"
      />
    </AreasContextProvider>
  );
}

export default Areas;
