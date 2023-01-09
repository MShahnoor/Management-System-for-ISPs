import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";

const ActionIcons = ({ obj }) => {
  return (
    <Stack direction="row" alignItems="center" paddingLeft={9} height={15}>
      <DeleteAction id={obj} />
      <EditAction id={obj} />
    </Stack>
  );
};

export default ActionIcons;
