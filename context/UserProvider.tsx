"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { UserDataUsage } from "@/types/users.types";

export type NullUser = UserDataUsage | null;

export type UserContextValue = {
  authenticated: boolean;
  isLoading: boolean;
  userData: NullUser;
  setUserData: (data: NullUser) => void;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<NullUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  // The cookie is HTTP-only, so the server is the only place that can say who
  // is signed in.
  useEffect(() => {
    let isCancelled = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        const body = (await response.json()) as { user?: NullUser };

        if (!isCancelled) {
          setUserData(body.user ?? null);
        }
      } catch {
        if (!isCancelled) {
          setUserData(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      isCancelled = true;
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUserData(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        authenticated: userData !== null,
        isLoading,
        userData,
        setUserData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
