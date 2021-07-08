import Grid from '../utils/Grid';

const Prospect = ({ donor }) => (
  <Grid cols={3}>
    <h4>{donor.first_name}</h4>
    <h4>{donor.last_name}</h4>
    <h4>{donor.notes}</h4>
  </Grid>

);

export default Prospect;
