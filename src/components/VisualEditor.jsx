import { ReactFlow, Background } from "@xyflow/react";
import CustomNode from "./CustomNode";
import "@xyflow/react/dist/style.css";
import { Box } from "@mui/material";

const VisualEditor = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  handleNodeClick,
  onConnect,
  handlePaneClick,
  handleNodeDoubleClick
}) => {
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <Box sx={{ width: "99.5vw", height: "90vh", pt: 8 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default VisualEditor;
