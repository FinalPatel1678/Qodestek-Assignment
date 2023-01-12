import { createContext, useContext, useState } from "react";

import Loader from "../components/Loader/Loader";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../util/theme";

export interface AppContextModel {
  loading: boolean;
  setLoading: (flag: boolean, key: string) => void;
  open: boolean;
  toggleDrawer: () => void;
}

interface KeyValueModel {
  key: string;
  value: boolean;
}

const initialState: AppContextModel = {
  loading: false,
  setLoading: () => {},
  open: false,
  toggleDrawer: () => {},
};

export const AppContext = createContext(initialState);

export const AppWrapper: React.FC<React.PropsWithChildren<{}>> = (
  props: React.PropsWithChildren<{}>
) => {
  const [loading, _setLoading] = useState<boolean>(false);
  const [loadingArr, setLoadingArr] = useState<KeyValueModel[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = (): void => {
    updateOpenFlag(!open);
  };

  const updateOpenFlag = (flag: boolean): void => {
    setOpen(flag);
  };

  const setLoading = (flag: boolean, key: string): void => {
    const prevState = loadingArr;
    const matched = prevState.findIndex((f) => f.key === key);
    if (flag) {
      if (matched > -1) {
        prevState[matched].value = flag;
      } else {
        prevState.push({
          key,
          value: flag,
        });
      }
    } else {
      if (matched > -1) {
        prevState.splice(matched, 1);
      }
    }
    setLoadingArr(prevState);
    _setLoading(prevState.filter((l) => l.value === true).length > 0);
  };

  const value: AppContextModel = {
    loading,
    setLoading,
    open,
    toggleDrawer,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={value}>
        <Loader value={loading} />
        {props.children}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export const useAppContext = (): AppContextModel => {
  return useContext(AppContext);
};
