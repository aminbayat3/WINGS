import { createAction } from "../utils/reducer/reducer.utils";
import { PREFERENCES_ACTION_TYPES } from "./preferences.types";

export const setGoal = (goal) => {
  return createAction(PREFERENCES_ACTION_TYPES.SET_GOAL, goal);
};

export const setDuration = (duration) => {
  return createAction(PREFERENCES_ACTION_TYPES.SET_DURATION, duration);
};

export const setDiet = (diet) => {
  return createAction(PREFERENCES_ACTION_TYPES.SET_DIET, diet);
};

export const setWeight = (weight) => {
  return createAction(PREFERENCES_ACTION_TYPES.SET_WEIGHT, weight);
};

export const setRestrictions = (restrictions) => {
  return createAction(PREFERENCES_ACTION_TYPES.SET_RESTRICTIONS, restrictions);
};
