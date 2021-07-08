import Grid from '../utils/Grid';

const Donor = ({ donor }) => (
  <Grid cols={2}>
    <h4>{donor.first_name}</h4>
    <h4>{donor.last_name}</h4>
  </Grid>

);

export default Donor;
