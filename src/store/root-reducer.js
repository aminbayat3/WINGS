import { combineReducers } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { preferencesReducer } from "./preferences/preferences.reducer";

export const rootReducer = combineReducers({
 theme: themeReducer,
 preferences: preferencesReducer,
});