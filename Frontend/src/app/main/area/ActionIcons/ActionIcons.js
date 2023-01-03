import Stack from "@mui/material/Stack";
import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";

const ActionIcons = ({ obj }) => {
  return (
    <Stack direction="row" alignItems="center" paddingLeft={9} height={15}>
      <DeleteAction id={obj.id} />
      <EditAction id={obj} />
    </Stack>
  );
};
export default ActionIcons;
