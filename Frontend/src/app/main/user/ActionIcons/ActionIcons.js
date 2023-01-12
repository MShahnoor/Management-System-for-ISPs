import Stack from "@mui/material/Stack";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";
import ViewAction from "./ViewAction";
import { PackagesContextProvider } from "../../context/PackageContext";
const ActionIcons = ({ obj }) => {
  
  return (
    <PackagesContextProvider>
     
    <Stack direction="row" alignItems="center" paddingLeft={9} height={15}>
      <DeleteAction id={obj._id} />
      <EditAction id={obj} />
      <ViewAction id={obj} />
    </Stack>
    </PackagesContextProvider>
  );
};

export default ActionIcons;
