import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { visualEditorReducer } from "./visual-editor/visual-editor.reducer";
import { modalReducer } from "./modal/modal.reducer";

export const rootReducer = combineReducers({
  theme: themeReducer,
  visualEditor: visualEditorReducer,
  modal: modalReducer,
});
