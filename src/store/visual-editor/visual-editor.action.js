import { createAction } from "../utils/reducer/reducer.utils";
import { VISUAL_EDITOR_ACTION_TYPES } from "./visual-editor.types";

export const saveNodes = (nodes) => {
  return createAction(VISUAL_EDITOR_ACTION_TYPES.SET_NODES, nodes);
};

export const saveEdges = (edges) => {
  return createAction(VISUAL_EDITOR_ACTION_TYPES.SET_EDGES, edges);
};
