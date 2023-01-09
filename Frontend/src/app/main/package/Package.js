import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import PackagesData from "./Table";
import FormDialog from "./AddPackageButton";
import { PackagesContextProvider } from "../context/PackageContext";

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

function Packages(props) {
  return (
    <PackagesContextProvider>
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
              <PackagesData />
            </div>
          </div>
        }
        scroll="content"
      />
    </PackagesContextProvider>
  );
}

export default Packages;
