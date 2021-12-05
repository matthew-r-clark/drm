import MuiAlert from '@material-ui/lab/Alert';
import { Slide, Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'ramda';

import { clearGlobalSuccess, clearGlobalError } from 'modules/store/alerts';

const clearMessage = (severity) => (
  severity === 'success'
    ? clearGlobalSuccess()
    : clearGlobalError()
);

const MESSAGE_DISPLAY_DURATION = 5000;

const Alert = ({ severity }) => {
  const [open, setOpen] = useState(false);
  const message = useSelector(path(['alerts', severity]));
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          dispatch(clearMessage(severity));
        }, 1000);
      }, MESSAGE_DISPLAY_DURATION);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
    >
      <MuiAlert severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export const GlobalError = () => <Alert severity="error" />;

export const GlobalSuccess = () => <Alert severity="success" />;
