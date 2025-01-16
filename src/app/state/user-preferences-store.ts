import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { SupportedLocale } from "../components/LocaleSelector";

export type UserPreferencesState = {
  signId: number | null;
  locale: SupportedLocale;
};

export type UserPreferencesActions = {
  setSignId: (newSignId: number | null) => void;
  setLocale: (newLocale: SupportedLocale) => void;
};

export type UserPreferencesStore = UserPreferencesState &
  UserPreferencesActions;

export const defaultInitState: UserPreferencesState = {
  signId: null,
  locale: "re",
};

export const createUserPreferencesStore = (
  initState: UserPreferencesState = defaultInitState,
) => {
  return createStore<UserPreferencesStore>()(
    persist(
      (set) => ({
        ...initState,
        setSignId: (newSign: number | null) => set({ signId: newSign }),
        setLocale: (newLocale: SupportedLocale) => set({ locale: newLocale }),
      }),
      { name: "scope-preferences" },
    ),
  );
};
