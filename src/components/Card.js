import styled from '@emotion/styled';
import { pathEq } from 'ramda';
import CloseIcon from '@material-ui/icons/Close';

import colors from 'styles/colors';

const CloseButton = styled(CloseIcon)({
  cursor: 'pointer',
  position: 'absolute',
  top: 5,
  right: 5,
});

const Background = styled.div({
  zIndex: 1000,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Container = styled.div({
  zIndex: 1001,
  border: `1px solid ${colors.veryLightGray}`,
  borderRadius: 10,
  margin: 50,
  height: '95vh',
  width: '95vw',
  backgroundColor: '#fff',
  boxShadow: '1px 1px 2px 0px rgb(0 0 0 / 50%)',
  padding: 25,
  position: 'relative',
  top: 0,
});

export default function Card({ handleClose, content }) {
  return (
    <Background
      id="card-background"
      onClick={(e) => {
        if (pathEq(['target', 'id'], 'card-background', e)) {
          handleClose();
        }
      }}
    >
      <Container>
        <CloseButton onClick={handleClose} />
        {content}
      </Container>
    </Background>
  );
}
