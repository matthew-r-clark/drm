import GridWrapper from '../utils/GridWrapper';

const Prospect = ({ donor }) => (
  <GridWrapper cols={3}>
    <h4>{donor.first_name}</h4>
    <h4>{donor.last_name}</h4>
    <h4>{donor.notes}</h4>
  </GridWrapper>

);

export default Prospect;
