import Stack from "@mui/material/Stack";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";
import ViewAction from "./ViewAction";

const ActionIcons = ({ obj }) => {
  console.log(obj);
  return (
    <Stack direction="row" alignItems="center" paddingLeft={9} height={15}>
      <DeleteAction id={obj._id} />
      <EditAction id={obj} />
      <ViewAction id={obj} />
    </Stack>
  );
};

export default ActionIcons;
