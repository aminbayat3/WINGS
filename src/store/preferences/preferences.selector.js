import { createSelector } from "reselect";
import { calculateMacros } from "../../components/nutritionalNeeds";

const selectPreferencesReducer = (state) => state.preferences;

export const selectWeight = createSelector(
  [selectPreferencesReducer],
  (preferences) => preferences.weight
);

export const selectGoal = createSelector(
  [selectPreferencesReducer],
  (preferences) => preferences.goal
);

export const selectDailyMacros = createSelector(
  [selectWeight, selectGoal],
  (weight, goal) => {
    if (!weight || !goal) return null;
    return calculateMacros(+weight, goal);
  }
);