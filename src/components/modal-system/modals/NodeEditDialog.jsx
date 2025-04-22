import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { ModalButton } from "./styles/modalButton.styles";

const getDefaultInputValues = (selectedNode) => ({
  description: selectedNode.data.description,
});

const NodeEditDialog = ({ selectedNode, handleNodeSave, onClose }) => {
  const [inputValues, setInputValues] = useState(
    getDefaultInputValues(selectedNode)
  );
  const { description } = inputValues;
  const {
    palette: { info },
  } = useTheme();

  const onHandleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveModal = () => {
    handleNodeSave({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        description,
      },
    });
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <AppBar
        position="relative"
        color={info.contrastText}
        elevation={1}
        sx={{ backgroundColor: info.dark }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {selectedNode?.data?.title || "Edit Node"}
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent sx={{ mt: 2 }}>
        <TextField
          fullWidth
          name="description"
          label="Description"
          value={description}
          onChange={onHandleInputChange}
          multiline
          rows={16}
        />
      </DialogContent>

      <DialogActions>
        <ModalButton
          variant="contained"
          onClick={onClose}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={handleSaveModal}
          variant="contained"
        >
          Save
        </ModalButton>
      </DialogActions>
    </Dialog>
  );
};

export default NodeEditDialog;
