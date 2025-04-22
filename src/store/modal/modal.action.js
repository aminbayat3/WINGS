import { createAction } from "../utils/reducer/reducer.utils";
import { MODAL_ACTION_TYPES } from "./modal.types";

export const showModal = (type, props) => {
  return createAction(MODAL_ACTION_TYPES.SHOW_MODAL, { type, props });
};

export const closeModal = () => {
  return createAction(MODAL_ACTION_TYPES.CLOSE_MODAL);
};
