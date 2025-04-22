import { VISUAL_EDITOR_ACTION_TYPES } from "./visual-editor.types";

const VISUAL_INITIAL_STATE = {
  selectedNode: null,
};

export const visualEditorReducer = (state = VISUAL_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case VISUAL_EDITOR_ACTION_TYPES.SET_SELECTED_NODE:
      return {
        ...state,
        selectedNode: payload,
      };
    default:
      return state;
  }
};
