import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Grid from '../../components/utils/Grid';
import { DesktopOnly, MobileOnly } from '../../components/MediaQuery';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const Container = styled.div`

  h1 {
    margin-left: 1rem;
  }
  .columns {
    margin-left: -1rem;
    padding-left: 1rem;
  }

  .name-col {
    grid-column: 1/ span 2;
    padding-left: 1rem;

  }
  .status-col {
    grid-column: 3/ span 2;
  }
  .contact-col {
    grid-column: 5/ span 2;
  }
  .notes-col {
    grid-column: 7/ span 4;
  }
  .connections-col {
    grid-column: 11/ span 2;
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

  h1 {
    margin-left: 0;
  }

  .name-col{
    margin-left: -1rem;
    grid-column: 1/ span 3;
  }

  .status-col {
    grid-column: 4/ span 2;
  }
  .contact-col {
    grid-column: 6/ span 4;
  }
  .connections-col {
    grid-column: 10/ span 3;
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
      <h1>Prospects for {userId}</h1>
      <Grid className="columns" cols={12}>
        <h4 className="name-col">Name</h4>
        <h4 className="status-col">Status</h4>
        <h4 className="contact-col">Last Contacted</h4>
        <DesktopOnly>
          <h4 className="notes-col">Notes</h4>
        </DesktopOnly>

        <h4 className="connections-col">Other Connections</h4>
      </Grid>

      {prospects.map((prospect) => (
        <Grid className={prospect.id % 2 ? 'dark columns' : 'columns'} key={prospect.id} cols={12}>
          <p className="name-col">{prospect.name}</p>
          <p className="status-col">{prospect.status}</p>
          <p className="contact-col">{prospect.last_contacted}</p>
          <DesktopOnly>
            <p className="notes-col">{prospect.notes[0]}</p>
          </DesktopOnly>

          <p className="connections-col">
            <DesktopOnly>
              {prospect.others.map((other, index) => (
                <span>
                  {other}{prospect.others.length > 1 && index !== prospect.others.length - 1 ? ', ' : ''}
                </span>
              ))}
            </DesktopOnly>
            <MobileOnly><span className="numbers">{prospect.others.length}</span></MobileOnly>
          </p>
        </Grid>
      ))}

    </Container>
  );
}
