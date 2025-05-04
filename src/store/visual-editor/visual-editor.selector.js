import { createSelector } from "reselect";

const selectVisualEditorReducer = (state) => state.visualEditor;

export const selectAllNodes = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.nodes
);

export const selectAllEdges = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.edges
);

export const selectSelectedNode = (nodeId) =>
  createSelector([selectVisualEditorReducer], (visualEditor) =>
    visualEditor.nodes.find((n) => n.id === nodeId)
  );
