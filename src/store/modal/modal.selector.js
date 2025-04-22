import { createSelector } from "reselect";

const selectModalReducer = (state) => state.modal;

export const selectModalType = createSelector(
  [selectModalReducer],
  (modal) => modal.type
);

export const selectModalProps = createSelector(
  [selectModalReducer],
  (modal) => modal.props
);
