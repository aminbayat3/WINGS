import { Popover, Typography, TextField, Box, Stack } from "@mui/material";
import { useState } from "react";
import { ModalButton } from "./styles/modalButton.styles";

const RenamePopover = ({
  anchorEl,
  selectedNode,
  onClose,
  handleNodeSave,
  existingNodes,
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const trimmedNewTitle = newTitle.trim();

    if (!trimmedNewTitle) {
      setError("Title cannot be empty.");
    } else if (
      existingNodes.some(
        (node) =>
          node.data.title === trimmedNewTitle && node.id !== selectedNode.id // make sure it's not the same node
      )
    ) {
      setError("This title already exists.");
    } else {
      setError("");
    }
  };

  const handleSave = () => {
    if (!error && title) {
      handleNodeSave({
        ...selectedNode,
        data: { ...selectedNode.data, title },
      });
      onClose();
    }
  };

  return (
    <Popover
      open
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, width: 250 }}>
        <Typography variant="body2" sx={{ mb: 3 }}>
          What should <strong>{selectedNode?.data?.title}</strong> be renamed
          to?
        </Typography>
        <TextField
          fullWidth
          label="title"
          size="small"
          value={title}
          onChange={handleTitleChange}
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <ModalButton size="small" onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton
            disabled={!!error || !title}
            variant="contained"
            size="small"
            onClick={handleSave}
          >
            Save
          </ModalButton>
        </Stack>
      </Box>
    </Popover>
  );
};

export default RenamePopover;
