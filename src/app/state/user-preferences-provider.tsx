"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import {
  createUserPreferencesStore,
  UserPreferencesStore,
} from "./user-preferences-store";
import { useStore } from "zustand";

export type UserPreferencesStoreApi = ReturnType<
  typeof createUserPreferencesStore
>;

export const UserPreferencesStoreContext = createContext<
  UserPreferencesStoreApi | undefined
>(undefined);

export interface UserPreferencesStoreProviderProps {
  children: ReactNode;
}

export const UserPreferencesStoreProvider = ({
  children,
}: UserPreferencesStoreProviderProps) => {
  const storeRef = useRef<UserPreferencesStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createUserPreferencesStore();
  }

  return (
    <UserPreferencesStoreContext.Provider value={storeRef.current}>
      {children}
    </UserPreferencesStoreContext.Provider>
  );
};

export const useUserPreferencesStore = <T,>(
  selector: (store: UserPreferencesStore) => T,
): T => {
  const userPreferencesStoreContext = useContext(UserPreferencesStoreContext);

  if (!userPreferencesStoreContext) {
    throw new Error(
      "useUserPreferencesStore must be used within UserPreferencesStoreProvider",
    );
  }

  return useStore(userPreferencesStoreContext, selector);
};
