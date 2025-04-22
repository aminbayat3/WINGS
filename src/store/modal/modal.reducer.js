import { MODAL_ACTION_TYPES } from "./modal.types";

const MODAL_INITIAL_STATE = {
  type: null,
  props: {},
};

export const modalReducer = (state = MODAL_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_ACTION_TYPES.SHOW_MODAL:
      return {
        ...state,
        type: payload.type,
        props: payload.props || {},
      };
    case MODAL_ACTION_TYPES.CLOSE_MODAL:
      return {
        type: null,
        props: {},
      };
    default:
      return state;
  }
};
