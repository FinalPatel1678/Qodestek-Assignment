import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import { ConfirmationModalStyles } from "./ConfirmationModal.Styles";
import React from "react";

interface SessionExpiredModalProps {
  open: boolean;
  text: string;
  subText?: string;
  btnText: string;
  onConfirm: () => void;
  onClose?: () => void;
}

const ConfirmationModal: React.FC<SessionExpiredModalProps> = (
  props: SessionExpiredModalProps
) => {
  const { onConfirm, open, text, subText, btnText, onClose } = props;

  return (
    <ConfirmationModalStyles>
      <Dialog
        classes={{ paper: "dialog" }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers classes={{ root: "dialogContent" }}>
          <Typography variant="h5" gutterBottom className="title">
            {text}
          </Typography>
          <Typography variant="h6" className="subTitle">
            {subText}
          </Typography>

          <DialogActions>
            <Button
              size="small"
              variant="contained"
              onClick={onConfirm}
              color="primary"
            >
              {btnText}
            </Button>
            {onClose && (
              <Button
                size="small"
                variant="outlined"
                onClick={onClose}
                color="primary"
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ConfirmationModalStyles>
  );
};
export default ConfirmationModal;
