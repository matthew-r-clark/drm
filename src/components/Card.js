import { Modal } from '@material-ui/core';
import styled from '@emotion/styled';
import CloseIcon from '@material-ui/icons/Close';

import colors from 'styles/colors';

const ModalBackground = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'scroll',
});

const Container = styled.div({
  margin: 50,
  maxWidth: '600px',
  position: 'absolute',
  backgroundColor: colors.white,
  border: `1px solid ${colors.grayLight}`,
  borderRadius: 10,
  boxShadow: '1px 1px 2px 0px rgb(0 0 0 / 50%)',
  padding: 25,
  '@media (max-width: 500px)': {
    top: 0,
    margin: 0,
  },
});

const CloseButton = styled(CloseIcon)({
  cursor: 'pointer',
  position: 'absolute',
  top: 5,
  right: 5,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: colors.lightGray,
  },
});

export default function Card({ children, isOpen, close, innerRef }) {
  return (
    <ModalBackground
      open={isOpen}
      onClose={close}
      ref={innerRef}
    >
      <Container>
        <CloseButton onClick={close} />
        {children}
      </Container>
    </ModalBackground>
  );
}
