import { Modal } from '@material-ui/core';
import styled from '@emotion/styled';
import CloseIcon from '@material-ui/icons/Close';

import colors from 'styles/colors';

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

export default function Card({ children, isOpen, close }) {
  return (
    <Modal
      open={isOpen}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClose={close}
    >
      <div
        style={{
          margin: 50,
          position: 'absolute',
          backgroundColor: colors.white,
          border: `1px solid ${colors.grayLight}`,
          borderRadius: 10,
          boxShadow: '1px 1px 2px 0px rgb(0 0 0 / 50%)',
          padding: 10,
        }}
      >
        <CloseButton onClick={close} />
        {children}
      </div>
    </Modal>
  );
}
