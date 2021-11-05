import { createTheme } from '@material-ui/core';
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

export default theme;
