import {
  Alert,
  AlertProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

const CustomAlert = (props: AlertProps) => (
  <Alert elevation={4} variant="filled" {...props} />
);

export type SnackbarType = "success" | "info" | "warning" | "error";

export interface SnackbarMessageModel {
  type: SnackbarType;
  message: string;
}

interface Props {
  open: boolean;
  type: SnackbarType;
  message: string;
  closeCallback: () => void;
}

export default function CustomizedSnackbar(props: Props) {
  const [open, setOpen] = useState<boolean>(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = (
    event?: Event | SyntheticEvent<unknown, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    props.closeCallback();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div>
        <CustomAlert onClose={handleClose} severity={props.type}>
          {props.message}
        </CustomAlert>
      </div>
    </Snackbar>
  );
}
