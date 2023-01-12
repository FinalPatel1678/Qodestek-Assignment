import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import React from "react";
import { RoutePaths } from "../util/enum";
import Shared from "../util/shared";
import { UserModel } from "../models/UserModel";
import { useNavigate } from "react-router-dom";

export interface AuthContextModel {
  user: UserModel | undefined;
  setUser: (user: UserModel) => void;
  getToken: () => string;
  setToken: (token: string) => void;
  signOut: () => void;
}

const initialState: AuthContextModel = {
  user: undefined,
  setUser: () => {},
  getToken: () => "",
  setToken: () => {},
  signOut: () => {},
};

export const AuthContext = createContext(initialState);

export function AuthWrapper({ children }: React.PropsWithChildren<{}>) {
  const [user, _setUser] = useState<UserModel | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      setToken(user?.token);
    }
  }, [user?.token]);

  const setUser = (user: any): void => {
    _setUser(user);
  };

  const setToken = (token: string): void => {
    const item = {
      token: token,
      expiry: new Date().getTime() + 30 * 60 * 1000,
    };
    localStorage.setItem(Shared.localStorageKeys.TOKEN, JSON.stringify(item));
  };

  const getToken = (): string => {
    const itemStr = localStorage.getItem(Shared.localStorageKeys.TOKEN);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return "";
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      setOpen(true);
      return "";
    }
    return item.token;
  };

  const signOut = (): void => {
    localStorage.removeItem(Shared.localStorageKeys.TOKEN);
    setUser(undefined);
  };

  const onConfirm = useCallback((): void => {
    localStorage.removeItem(Shared.localStorageKeys.TOKEN);
    setOpen(false);
    navigate(`../../${RoutePaths.SignIn}`, { replace: true });
  }, [localStorage.getItem(Shared.localStorageKeys.TOKEN)]);

  useEffect(() => {
    const token = localStorage.getItem(Shared.localStorageKeys.TOKEN);
    if (user?._id && !token) {
      signOut();
    }
  }, [localStorage.getItem(Shared.localStorageKeys.TOKEN), user]);

  let value: AuthContextModel = {
    user,
    setUser,
    getToken,
    setToken,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      <ConfirmationModal
        open={open}
        onConfirm={onConfirm}
        btnText="Ok"
        text="Your session has expired, please reconnect to your personal space."
      />
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
