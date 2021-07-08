import { useRouter } from 'next/router';

import Grid from '../../utils/Grid';

import Prospect from '../../components/Prospect';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const prosArr = [
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

  const prospects = prosArr.map((prospect) => <Prospect key={prospect.id} donor={prospect} />);

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Prospects for {userId}</h1>
      <Grid cols={3}>
        <h3>First Name:</h3>
        <h3>Last Name:</h3>
        <h3>Notes:</h3>
      </Grid>
      {prospects}
    </>
  );
}
