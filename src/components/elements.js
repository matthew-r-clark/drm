import styled from '@emotion/styled';
import colors from 'styles/colors';

// eslint-disable-next-line import/prefer-default-export
export const StripedList = styled.ul({
  'li:nth-of-type(even)': {
    backgroundColor: colors.grayVeryLight,
  },
  listStyle: 'none',
  padding: 0,
});
