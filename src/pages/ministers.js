import Button from '@material-ui/core/Button';
import Grid from '../components/utils/Grid';

const ministers = [
  {
    id: 1,
    name: 'Reagann Smith',
    email: 'reagann.smith@anyfocus.org',
  },
  {
    id: 2,
    name: 'Danielle Rodriguez-Clark',
    email: 'danielle.clark@anyfocus.org',
  },
  {
    id: 3,
    name: 'Brandon Worsham',
    email: 'brandon.worsham@anyfocus.org',
  },

];

export default function Ministers() {
  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Ministers</h1>
      <Grid cols={4}>
        <h2>Name:</h2>
        <h2>Email:</h2>
        <h2>Update:</h2>
        <h2>Delete:</h2>
      </Grid>
      {ministers.map((minister) => (

        <Grid cols={4}>
          <p>{minister.name}</p>
          <p>{minister.email}</p>
          <Button style={{ width: '40%', height: '60%' }} variant="contained" color="default">Update</Button>
          <Button style={{ width: '40%', height: '60%' }} variant="contained" color="secondary">Delete</Button>
        </Grid>
      ))}
    </>
  );
}
