import CustomizedSnackbar, {
  SnackbarMessageModel,
  SnackbarType,
} from "../components/CustomizedSnackbar";
import { createContext, useContext, useState } from "react";

import React from "react";

export interface NotificationContextModel {
  showMessage: (message: SnackbarMessageModel) => void;
}
const initialState: NotificationContextModel = {
  showMessage: () => {},
};
export const NotificationContext = createContext(initialState);

export function NotificationWrapper({ children }: React.PropsWithChildren<{}>) {
  const [snackBar, toggleSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarType, setSnackBarType] = useState<SnackbarType>("info");

  const showMessage = (message: SnackbarMessageModel) => {
    setSnackBarMessage(message.message);
    setSnackBarType(message.type);
    toggleSnackBar(true);
  };

  let value: NotificationContextModel = {
    showMessage,
  };

  const clearSnackBar = () => {
    toggleSnackBar(false);
  };

  return (
    <NotificationContext.Provider value={value}>
      <CustomizedSnackbar
        open={snackBar}
        type={snackBarType}
        message={snackBarMessage}
        closeCallback={clearSnackBar}
      />
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
