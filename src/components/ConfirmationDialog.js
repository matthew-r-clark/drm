import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { H3 } from 'components/headers';

export default function ConfirmationDialog({
  children,
  title,
  handleClose,
  handleConfirm,
  handleCancel,
  open,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <H3 style={{ textAlign: 'center' }}>{title}</H3>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            if (handleCancel) {
              handleCancel();
            }
          }}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose();
            if (handleConfirm) {
              handleConfirm();
            }
          }}
          color="primary"
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
