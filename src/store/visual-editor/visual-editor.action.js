import { createAction } from "../utils/reducer/reducer.utils";
import { VISUAL_EDITOR_ACTION_TYPES } from "./visual-editor.types";

export const setSelectedNode = (node) => {
  return createAction(VISUAL_EDITOR_ACTION_TYPES.SET_SELECTED_NODE, node);
};
;
