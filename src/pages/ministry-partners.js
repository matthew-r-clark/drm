import Grid from '../components/utils/Grid';

export default function MinistryPartners() {
  const partners = [
    {
      id: 1,
      first_name: 'Jon',
      last_name: 'Smith',
    },
    {
      id: 2,
      first_name: 'Matt',
      last_name: 'Clark',
    },
    {
      id: 3,
      first_name: 'Mitchell',
      last_name: 'Pavel',
    },
    {
      id: 4,
      first_name: 'Bob',
      last_name: 'Chin',
    },
  ];

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Ministry Partner List</h1>
      <Grid cols={2}>
        <h3>First Name:</h3>
        <h3>Last Name:</h3>
      </Grid>
      {partners.map((partner) => (
        <Grid key={partner.id} cols={2}>
          <h4>{partner.first_name}</h4>
          <h4>{partner.last_name}</h4>
        </Grid>
      ))}
    </>
  );
}
