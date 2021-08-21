import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  pipe, join, prop, propOr, pathOr,
} from 'ramda';
import Grid from '../../components/utils/Grid';
import { DesktopOnly, MobileOnly } from '../../components/MediaQuery';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;
  const getNames = pathOr('No Name', ['names', '0']);
  const getStatus = propOr('No status set', 'status');
  const getLastContacted = propOr('No contact history', 'last_contacted');
  const getNotes = pathOr('No notes', ['notes', '0']);
  const joinOthers = pipe(
    prop('others'),
    join(', '),
  );
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

  .striped:nth-child(2n) {
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
      names: ['Jon Smith'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '07/13',
      notes: ['Meeting up on 08/27', 'Left a voicemail', 'Emailed'],
      others: ['Reagann Smith', 'Ryan Bristow'],
    },
    {
      id: 2,
      names: ['Matt Clark'],
      preferred_name: null,
      status: 'pledged, no amount',
      last_contacted: '06/21',
      notes: ['Need to follow up'],
      others: ['Danielle Clark'],
    },
    {
      id: 3,
      names: ['Mitchell Pavel'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '06/30',
      notes: ['Wants to donate, partnering with the wife'],
      others: [],
    },
    {
      id: 4,
      names: ['Bob Chin'],
      preferred_name: null,
      status: 'No answer',
      last_contacted: '07/01',
      notes: ['Left voicemail', 'Attempted contact; No response.'],
      others: [],
    },
    {
      id: 5,
      names: null,
      preferred_name: null,
      status: null,
      last_contacted: null,
      notes: null,
      others: [],
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

        <Grid className="striped columns" key={prospect.id} cols={12}>
          <p className="name-col">{getNames(prospect)}</p>
          <p className="status-col">{getStatus(prospect)}</p>
          <p className="contact-col">{getLastContacted(prospect)}</p>
          <DesktopOnly>
            <p className="notes-col">{getNotes(prospect)}</p>
          </DesktopOnly>
          <p className="connections-col">
            <DesktopOnly>
              <span>
                {joinOthers(prospect)}
              </span>
            </DesktopOnly>
            <MobileOnly><span className="numbers">{prospect.others.length}</span></MobileOnly>
          </p>
        </Grid>
      ))}
    </Container>
  );
}
