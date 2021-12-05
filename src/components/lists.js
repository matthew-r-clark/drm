import styled from '@emotion/styled';
import colors from 'styles/colors';

export const PlainList = styled.ul({
  listStyle: 'none',
  padding: 0,
});

export const StripedList = styled(PlainList)({
  'li:nth-of-type(even)': {
    backgroundColor: colors.grayLight,
  },
});

export const LineSeparatedList = styled(PlainList)({
  'li:first-child': {
    borderTop: '1px solid white',
  },
  'li:not(:first-child)': {
    borderTop: `1px solid ${colors.grayVeryLight}`,
  },
  'li:hover': {
    borderTop: '1px solid white',
    boxShadow: `inset 1px 1px 2px ${colors.grayLight}`,
    backgroundColor: colors.grayVeryLight,
    cursor: 'pointer',
  },
});
