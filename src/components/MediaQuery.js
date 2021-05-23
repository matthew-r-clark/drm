import { Hidden } from '@material-ui/core';

export const DesktopOnly = ({ children }) => (
  <Hidden smDown>{children}</Hidden>
);

export const MobileOnly = ({ children }) => (
  <Hidden mdUp>{children}</Hidden>
);
