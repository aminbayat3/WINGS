import { createSelector } from "reselect";

const selectVisualEditorReducer = (state) => state.visualEditor;

export const selectSelectedNode = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.selectedNode
);

export const selectAllNodes = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.nodes
);

export const selectAllEdges = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.edges
);

export const selectSelectedNodeId = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.selectedNode.id
);
