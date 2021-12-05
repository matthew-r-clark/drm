import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { path } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from 'modules/store/authorization';
import colors from 'styles/colors';

const WhiteBtn = styled(Button)({ color: colors.white });

export default function LoginButton({ clickHandler }) {
  const isAuthorized = useSelector(path(['authorization', 'isAuthorized']));
  const dispatch = useDispatch();

  return isAuthorized
    ? (
      <WhiteBtn
        onClick={() => {
          dispatch(logout());
          if (clickHandler) {
            clickHandler();
          }
        }}
      >
        Logout
      </WhiteBtn>
    )
    : (
      <WhiteBtn
        onClick={() => {
          dispatch(login());
          if (clickHandler) {
            clickHandler();
          }
        }}
      >
        Login
      </WhiteBtn>
    );
}
