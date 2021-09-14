import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import { path } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '@@store/authorization';
import colors from '../styles/colors';

const WhiteBtn = styled(Button)({ color: colors.white });

export default function LoginButton() {
  const isAuthorized = useSelector(path(['authorization', 'isAuthorized']));
  const dispatch = useDispatch();

  return isAuthorized
    ? <WhiteBtn onClick={() => dispatch(logout())}>Logout</WhiteBtn>
    : <WhiteBtn onClick={() => dispatch(login())}>Login</WhiteBtn>;
}
