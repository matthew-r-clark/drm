import Donor from '../components/Donor';

import GridWrapper from '../utils/GridWrapper';

export default function Donors() {
  const donorArr = [
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

  const donors = donorArr.map((donor) => <Donor key={donor.id} donor={donor} />);

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Donor List</h1>
      <GridWrapper cols={2}>
        <h3>First Name:</h3>
        <h3>Last Name:</h3>
      </GridWrapper>
      {donors}
    </>
  );
}
