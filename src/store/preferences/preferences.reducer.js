import { PREFERENCES_ACTION_TYPES } from "./preferences.types";

const THEME_INITIAL_STATE = {
  goal: "",
  duration: "",
  diet: "",
  weight: undefined, 
  restrictions: [],
};

export const preferencesReducer = (state = THEME_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PREFERENCES_ACTION_TYPES.SET_GOAL:
      return {
        ...state,
        goal: payload,
      };
    case PREFERENCES_ACTION_TYPES.SET_DURATION:
      return {
        ...state,
        duration: payload,
      };
    case PREFERENCES_ACTION_TYPES.SET_DIET:
      return {
        ...state,
        diet: payload,
      };
      case PREFERENCES_ACTION_TYPES.SET_WEIGHT:
      return {
        ...state,
        weight: payload,
      };
      case PREFERENCES_ACTION_TYPES.SET_RESTRICTIONS:
      return {
        ...state,
        restrictions: payload,
      };
    default:
      return state;
  }
};
