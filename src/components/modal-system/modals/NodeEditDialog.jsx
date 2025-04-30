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

const NodeEditDialog = ({ selectedNode, handleNodeSave, onClose, setEdges, nodes }) => {
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
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        description,
      },
    };
  
    handleNodeSave(updatedNode);
    onClose();
  
    const linkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
    const foundTitles = new Set();
    let match;
  
    while ((match = linkRegex.exec(description)) !== null) {
      const targetTitle = match[2] || match[1];
      foundTitles.add(targetTitle.trim());
    }
  
    const sourceId = selectedNode.id;
  
    setEdges((prevEdges) => {
      const newEdges = [];
      const existingTargets = new Set();
  
      // Step 1: Preserve only edges that still match a [[link]]
      prevEdges.forEach((edge) => {
        if (edge.source === sourceId) {
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (targetNode && foundTitles.has(targetNode.data.title)) {
            newEdges.push(edge);
            existingTargets.add(targetNode.id);
          }
        } else {
          newEdges.push(edge); // Keep unrelated edges
        }
      });
  
      // Step 2: Add new edges for [[links]] that don't exist yet
      foundTitles.forEach((title) => {
        const targetNode = nodes.find((n) => n.data.title === title);
        if (targetNode && !existingTargets.has(targetNode.id)) {
          newEdges.push({
            id: `e${sourceId}-${targetNode.id}`,
            source: sourceId,
            target: targetNode.id,
          });
        }
      });
  
      return newEdges;
    });
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
