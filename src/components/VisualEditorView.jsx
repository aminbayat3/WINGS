import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import {
  INITIAL_EDGES,
  INITIAL_NODES,
  generateNewNode,
} from "./visual-editor.utils";
import VisualEditor from "./VisualEditor";
import ToolbarPanel from "./ToolbarPanel";
import { setSelectedNode } from "../store/visual-editor/visual-editor.action";
import { selectSelectedNode } from "../store/visual-editor/visual-editor.selector";
import { showModal } from "../store/modal/modal.action";
import { MODAL_TYPES } from "../store/modal/modal.types";

const VisualEditorView = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const selectedNode = useSelector(selectSelectedNode);
  const dispatch = useDispatch();

  const handleNodeSave = (newNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id ? { ...newNode } : node
      )
    );
    dispatch(setSelectedNode(newNode));
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    node.id !== selectedNode?.id && dispatch(setSelectedNode(node));
  };

  const handleNodeEdit = (node) => {
    dispatch(
      showModal(MODAL_TYPES.NODE_EDIT, {
        selectedNode: node,
        handleNodeSave,
      })
    );
  };

  const handleNodeDoubleClick = (event, node) => {
    handleNodeEdit(node);
  };

  const handlePaneClick = () => {
    selectedNode && dispatch(setSelectedNode(null));
  };

  const handleAddNode = () => {
    const newNode = generateNewNode(nodes);
    setNodes((prevNodes) => ([...prevNodes, newNode]));
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
      )
    );
    dispatch(setSelectedNode(null));
  };

  const handleRename = (event, node) => {
    dispatch(
      showModal(MODAL_TYPES.RENAME_NODE, {
        selectedNode: node,
        anchorEl: event.currentTarget,
        handleNodeSave,
        existingNodes: nodes,
      })
    );
  };
  const handleTest = () => console.log("Test from", selectedNode);

  return (
    <>
      <ToolbarPanel
        onAdd={handleAddNode}
        onEdit={handleNodeEdit}
        onRename={handleRename}
        onDelete={handleDeleteNode}
        onTest={handleTest}
      />
      <VisualEditor
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        handleNodeClick={handleNodeClick}
        handlePaneClick={handlePaneClick}
        handleNodeDoubleClick={handleNodeDoubleClick}
        onConnect={onConnect}
      />
    </>
  );
};

export default VisualEditorView;
