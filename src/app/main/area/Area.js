import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import AreasTable from "./Table";
import AddButton from "./Button";

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

function Dashbaord(props) {
  return (
    <Root
      content={
        <div className="p-24">
          <AddButton />
          <AreasTable />
        </div>
      }
      scroll="content"
    />
  );
}

export default Dashbaord;
