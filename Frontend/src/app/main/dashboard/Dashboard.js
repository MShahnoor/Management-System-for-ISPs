import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import TopPackages from "./packages/packages";
import RevenueStats from "./revenue/RevenueStats";

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
  const { t } = useTranslation("examplePage");

  return (
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
          <RevenueStats />
          <Typography variant="h5" component="div">
            Most Popular Packages.
          </Typography>
          <TopPackages />
        </div>
      }
      scroll="content"
    />
  );
}

export default Dashbaord;
