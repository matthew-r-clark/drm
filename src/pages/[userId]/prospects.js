import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Prospect from '../../components/Prospect';
import { DesktopOnly } from '../../components/MediaQuery';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const prospectsArr = [
    {
      id: 1,
      first_name: 'Jon',
      last_name: 'Smith',
      notes: 'contacted on 5/17'
    },
    {
      id: 2,
      first_name: 'Matt',
      last_name: 'Clark',
      notes: 'need to contact'
    },
    {
      id: 3,
      first_name: 'Mitchell',
      last_name: 'Pavel',
      notes: 'No contact list'
    },
    {
      id: 4,
      first_name: 'Bob',
      last_name: 'Chin',
      notes: 'contacted on 05/10'
    },
  ]
  
  
  const prospects = prospectsArr.map(prospect => <Prospect key={prospect.id} instance={prospect} />)

  const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 1rem;
  `;
  return(
    <>
    
    {/* <DesktopOnly> */}
        <h1 style={{marginLeft: '1rem'}}>Prospects for {userId}</h1> 
    {/* </DesktopOnly> */}
    <Title>
      <h3>First Name:</h3>
      <h3>Last Name:</h3>
      <h3>Notes</h3>
    </Title>
     {prospects}
    </>
  ) 
}