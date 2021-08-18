import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Grid from '../../components/utils/Grid';
import { DesktopOnly, MobileOnly } from '../../components/MediaQuery';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const Container = styled.div`
  margin-left: -1rem;

  .first-col {
    grid-column: 1/ span 2;
    padding-left: 1rem;

  }
  .second-col {
    grid-column: 3/ span 2;
  }
  .third-col {
    grid-column: 5/ span 2;
  }
  .fourth-col {
    grid-column: 7/ span 2;
  }
  .fifth-col {
    grid-column: 9/ span 3;
  }
  .sixth-col {
    grid-column: 12/ span 1;
  }

  .dark {
    background: #F5F5F5;

  }

  .numbers {
    display: block;
    width: 15px;
    height: 15px;
    text-align: center;
    background-color: red;
    color: white;
    border-radius: 50%;
    margin: 0 auto;
  }

@media (max-width: 800px){
  font-size: .7rem;
  text-align: center;
  .first-col{
    margin-left: -1rem;
  }

}
  `;

  const prospects = [
    {
      id: 1,
      name: 'Jon Smith',
      status: 'contacted',
      last_contacted: '07/13',
      notes: ['Meeting up on 08/27', 'Left a voicemail', 'Emailed'],
      others: ['Reagann Smith', 'Ryan Bristow'],
      pledge: false,
    },
    {
      id: 2,
      name: 'Matt Clark',
      status: 'pledged, no amount',
      last_contacted: '06/21',
      notes: ['Need to follow up'],
      others: ['Danielle Clark'],
      pledge: true,
    },
    {
      id: 3,
      name: 'Mitchell Pavel',
      status: 'contacted',
      last_contacted: '06/30',
      notes: ['Wants to donate, partnering with the wife'],
      others: [],
      pledge: true,
    },
    {
      id: 4,
      name: 'Bob Chin',
      status: 'No answer',
      last_contacted: '07/01',
      notes: ['Left voicemail', 'Attempted contact; No response.'],
      others: [],
      pledge: false,
    },
  ];

  return (
    <Container>
      <h1 style={{ marginLeft: '1rem' }}>Prospects for {userId}</h1>
      <Grid cols={12}>
        <h4 className="first-col">Name</h4>
        <h4 className="second-col">Status</h4>
        <h4 className="third-col">Last Contacted</h4>
        <h4 className="fourth-col">Notes</h4>
        <h4 className="fifth-col">Other Connections</h4>
        <h4 className="sixth-col">Pledge</h4>
      </Grid>

      {prospects.map((prospect) => (
        <Grid className={prospect.id % 2 ? 'dark columns' : 'columns'} key={prospect.id} cols={12}>
          <p className="first-col">{prospect.name}</p>
          <p className="second-col">{prospect.status}</p>
          <p className="third-col">{prospect.last_contacted}</p>
          <p className="fourth-col">{prospect.notes[0]}</p>

          <p className="fifth-col">
            <DesktopOnly>
              {prospect.others.map((other, index) => (
                <span>
                  {other}{prospect.others.length > 1 && index !== prospect.others.length - 1 ? ', ' : ''}
                </span>
              ))}
            </DesktopOnly>
            <MobileOnly><span className="numbers">{prospect.others.length}</span></MobileOnly>
          </p>

          <p className="sixth-col">{prospect.pledge ? 'Yes' : 'No'}</p>
        </Grid>
      ))}

    </Container>
  );
}
