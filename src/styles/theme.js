import { createTheme } from '@material-ui/core';
import { path } from 'ramda';
import colors from 'styles/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.red,
    },
  },
});

export const getBreakpoint = (name) => path(['breakpoints', 'values', name], theme);

export default theme;
