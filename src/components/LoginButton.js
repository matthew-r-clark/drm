import { Button } from '@material-ui/core';
import React from 'react';
import { path } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../lib/auth-state-slice';

export default function LoginButton() {
  const currentAuthState = useSelector(path(['authState', 'value']));
  const dispatch = useDispatch();

  return currentAuthState
    ? <Button onClick={() => dispatch(logout())}>Logout</Button>
    : <Button onClick={() => dispatch(login())}>Login</Button>;
}
