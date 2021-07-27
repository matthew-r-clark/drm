import { useRouter } from 'next/router';
import Grid from '../../components/utils/Grid';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const prospects = [
    {
      id: 1,
      first_name: 'Jon',
      last_name: 'Smith',
      notes: 'contacted on 5/17',
    },
    {
      id: 2,
      first_name: 'Matt',
      last_name: 'Clark',
      notes: 'need to contact',
    },
    {
      id: 3,
      first_name: 'Mitchell',
      last_name: 'Pavel',
      notes: 'No contact list',
    },
    {
      id: 4,
      first_name: 'Bob',
      last_name: 'Chin',
      notes: 'contacted on 05/10',
    },
  ];

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Prospects for {userId}</h1>
      <Grid cols={3}>
        <h3>First Name:</h3>
        <h3>Last Name:</h3>
        <h3>Notes:</h3>
      </Grid>

      {prospects.map((prospect) => (
        <Grid key={prospect.id} cols={3}>
          <h4>{prospect.first_name}</h4>
          <h4>{prospect.last_name}</h4>
          <h4>{prospect.notes}</h4>
        </Grid>
      ))}

    </>
  );
}
