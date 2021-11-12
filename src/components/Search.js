import { Field } from 'formik';
import styled from '@emotion/styled';

import colors from 'styles/colors';

const Search = styled(Field)({
  padding: 7,
  backgroundColor: colors.grayVeryLight,
  border: 'none',
  borderRadius: 5,
  '&:focus': {
    boxShadow: `inset 1px 1px 2px ${colors.grayLight}`,
  },
});

export default Search;
