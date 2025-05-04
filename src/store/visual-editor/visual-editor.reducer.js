import { VISUAL_EDITOR_ACTION_TYPES } from "./visual-editor.types";
import { INITIAL_NODES } from "../../components/visual-editor/visual-editor.utils";

const VISUAL_INITIAL_STATE = {
  nodes: INITIAL_NODES,
  edges: [],
};

export const visualEditorReducer = (state = VISUAL_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case VISUAL_EDITOR_ACTION_TYPES.SET_NODES:
      return {
        ...state,
        nodes: payload,
      };
    case VISUAL_EDITOR_ACTION_TYPES.SET_EDGES:
      return {
        ...state,
        edges: payload,
      };
    default:
      return state;
  }
};
