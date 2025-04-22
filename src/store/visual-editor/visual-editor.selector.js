import { createSelector } from "reselect";

const selectVisualEditorReducer = (state) => state.visualEditor;

export const selectSelectedNode = createSelector(
  [selectVisualEditorReducer],
  (visualEditor) => visualEditor.selectedNode
);