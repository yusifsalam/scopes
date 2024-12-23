import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserPreferencesState = {
  signId: number | null;
};

export type UserPreferencesActions = {
  setSignId: (newSignId: number | null) => void;
};

export type UserPreferencesStore = UserPreferencesState &
  UserPreferencesActions;

export const defaultInitState: UserPreferencesState = {
  signId: null,
};

export const createUserPreferencesStore = (
  initState: UserPreferencesState = defaultInitState,
) => {
  return createStore<UserPreferencesStore>()(
    persist(
      (set) => ({
        ...initState,
        setSignId: (newSign: number | null) => set({ signId: newSign }),
      }),
      { name: "scope-preferences" },
    ),
  );
};
