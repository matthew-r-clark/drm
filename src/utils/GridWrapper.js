import styled from '@emotion/styled';

const GridWrapper = ({ children, cols }) => {
  const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    margin-left: 1rem;
    `;
  return (
    <Grid>
      {children}
    </Grid>

  );
};

export default GridWrapper;
