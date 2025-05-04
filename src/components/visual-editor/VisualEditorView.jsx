import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import {
  INITIAL_EDGES,
  INITIAL_NODES,
  generateNewNode,
} from "./visual-editor.utils";
import VisualEditor from "./VisualEditor";
import ToolbarPanel from "../ToolbarPanel";
import { selectSelectedNode } from "../../store/visual-editor/visual-editor.selector";
import { showModal } from "../../store/modal/modal.action";
import { MODAL_TYPES } from "../../store/modal/modal.types";
import {
  saveEdges,
  saveNodes,
} from "../../store/visual-editor/visual-editor.action";

const VisualEditorView = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const navigate = useNavigate();
  const { nodeId } = useParams();
  const selectedNode = useSelector((state) =>
    selectSelectedNode(state, nodeId)
  );
  const dispatch = useDispatch();

  const handleNodeSave = (newNode) => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode.id ? { ...newNode } : node
    );

    setNodes(updatedNodes);
    dispatch(saveNodes(updatedNodes));
  };

  const handleTitleSave = (updatedNode, allUpdatedNodes) => {
    const updatedNodes = allUpdatedNodes.map((node) =>
      node.id === updatedNode.id ? updatedNode : node
    );

    setNodes(updatedNodes);
    dispatch(saveNodes(updatedNodes));
  };

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      const targetNode = nodes.find((n) => n.id === target);
      const targetTitle = targetNode?.data.title;

      if (!targetTitle) return;

      const updatedNodes = nodes.map((node) =>
        node.id === source
          ? {
              ...node,
              data: {
                ...node.data,
                description: `${
                  node.data.description || ""
                }\n\n[[${targetTitle}]]`,
              },
            }
          : node
      );

      const updatedEdges = addEdge(params, edges);

      setNodes(updatedNodes);
      setEdges(updatedEdges);
      dispatch(saveNodes(updatedNodes));
      dispatch(saveEdges(updatedEdges));
    },
    [nodes, edges, setNodes, setEdges, dispatch]
  );

  const handleNodeClick = (event, node) => {
    node.id !== selectedNode?.id && navigate(`/${node.id}`);
  };

  const handleNodeEdit = (node) => {
    dispatch(
      showModal(MODAL_TYPES.NODE_EDIT, {
        selectedNode: node,
        nodes,
        handleNodeSave,
        setEdges,
      })
    );
  };

  const handleNodeDoubleClick = (event, node) => {
    handleNodeEdit(node);
  };

  const handlePaneClick = () => {
    navigate("/");
  };

  const handleAddNode = () => {
    const newNode = generateNewNode(nodes);
    const updatedNodes = [...nodes, newNode];

    setNodes(updatedNodes);
    dispatch(saveNodes(updatedNodes));
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;

    const updatedNodes = nodes.filter((n) => n.id !== selectedNode.id);
    const updatedEdges = edges.filter(
      (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    dispatch(saveNodes(updatedNodes));
    dispatch(saveEdges(updatedEdges));

    navigate("/");
  };

  const handleRename = (event, node) => {
    dispatch(
      showModal(MODAL_TYPES.RENAME_NODE, {
        selectedNode: node,
        anchorEl: event.currentTarget,
        handleTitleSave,
        existingNodes: nodes,
      })
    );
  };
  const handleTest = () => {};

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
