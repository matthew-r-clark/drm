import { useRouter } from 'next/router';

import GridWrapper from '../../utils/GridWrapper';

import Pledge from '../../components/Pledge';

export default function Pledges() {
  const router = useRouter();
  const { userId } = router.query;

  const pledgesArr = [
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

  const pledges = pledgesArr.map((pledge) => <Pledge key={pledge.id} donor={pledge} />);

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>pledges for {userId}</h1>
      <GridWrapper cols={2}>
        <h3>First Name:</h3>
        <h3>Last Name:</h3>
      </GridWrapper>
      {pledges}
    </>
  );
}
