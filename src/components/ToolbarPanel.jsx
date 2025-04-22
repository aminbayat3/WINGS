import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { selectSelectedNode } from "../store/visual-editor/visual-editor.selector";

const ToolbarPanel = ({ onAdd, onEdit, onRename, onDelete, onTest }) => {
  const selectedNode = useSelector(selectSelectedNode);
  const disabled = !selectedNode;

  const onHandleNodeEdit = () => {
    onEdit(selectedNode);
  }

  const onHandleNodeRename = (event) => {
    onRename(event, selectedNode);
  }

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ top: "99px" }}>
      <Toolbar variant="dense">
        <Tooltip title="Add Node">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Content">
          <IconButton onClick={onHandleNodeEdit} disabled={disabled}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Rename">
          <IconButton onClick={onHandleNodeRename} disabled={disabled}>
            <TextFieldsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Node">
          <IconButton onClick={onDelete} disabled={disabled}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Test from Here">
          <IconButton onClick={onTest} disabled={disabled}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarPanel;
