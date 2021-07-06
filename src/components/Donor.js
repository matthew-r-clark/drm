import GridWrapper from '../utils/GridWrapper';

const Donor = ({ donor }) => (
  <GridWrapper cols={2}>
    <h4>{donor.first_name}</h4>
    <h4>{donor.last_name}</h4>
  </GridWrapper>

);

export default Donor;
