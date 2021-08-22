import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  pipe, join, length, path, prop,
} from 'ramda';
import Grid from '@material-ui/core/Grid';
import { DesktopOnly, MobileOnly } from '../../components/MediaQuery';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;
  const joinOtherMinisters = pipe(prop('other_ministers'), join(', '));
  const Container = styled.div`
    h1 {
      margin-left: 1rem;
    }

    .columns {
      padding-left: 1rem;
    }

    .striped:nth-of-type(2n) {
      background: #f5f5f5;
    }

    .numbers {
      display: block;
      width: 25px;
      height: 25px;
      text-align: center;
      background-color: red;
      color: white;
      border-radius: 50%;
      margin: 0 auto;
    }

    @media (max-width: 960px) {
      text-align: center;

      h1 {
        margin-left: 0;
      }

      .columns {
        padding: 0;
      }
    }
  `;

  const prospects = [
    {
      id: 1,
      names: ['Jon smith'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '07/13',
      notes: ['Meeting up on 08/27', 'Left a voicemail', 'Emailed'],
      other_ministers: ['Reagann Smith', 'Ryan Bristow'],
    },
    {
      id: 2,
      names: ['Matt Clark'],
      preferred_name: null,
      status: 'pledged, no amount',
      last_contacted: '06/21',
      notes: ['Need to follow up'],
      other_ministers: ['Danielle Clark'],
    },
    {
      id: 3,
      names: ['Mitchell Pavel'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '06/30',
      notes: ['Wants to donate, partnering with the wife'],
      other_ministers: [],
    },
    {
      id: 4,
      names: ['Bob Chin'],
      preferred_name: null,
      status: 'No answer',
      last_contacted: '07/01',
      notes: ['Left voicemail', 'Attempted contact; No response.'],
      other_ministers: [],
    },
  ];

  return (
    <Container>
      <h1>Prospects for {userId}</h1>
      <Grid container spacing={0} className="columns">
        <Grid item md={2} xs={3}>
          <h4>Name</h4>
        </Grid>
        <Grid item md={2} xs={3}>
          <h4>Status</h4>
        </Grid>
        <Grid item md={2} xs={3}>
          <h4>Last Contacted</h4>
        </Grid>
        <DesktopOnly>
          <Grid item md={3}>
            <h4>Notes</h4>
          </Grid>
        </DesktopOnly>
        <Grid item md={3} xs={3}>
          <h4>Other Ministers</h4>
        </Grid>
      </Grid>
      {prospects.map((prospect) => (
        <Grid
          container
          spacing={1}
          key={prospect.id}
          className="striped columns"
        >
          <Grid item md={2} xs={3}>
            <p>{path(['names', '0'], prospect)}</p>
          </Grid>
          <Grid item md={2} xs={3}>
            <p>{prop('status', prospect)}</p>
          </Grid>
          <Grid item md={2} xs={3}>
            <p>{prop('last_contacted', prospect)}</p>
          </Grid>
          <DesktopOnly>
            <Grid item md={3}>
              <p>{path(['notes', '0'], prospect)}</p>
            </Grid>
          </DesktopOnly>
          <Grid item md={2} xs={3}>
            <p>
              <DesktopOnly>
                <span>{joinOtherMinisters(prospect)}</span>
              </DesktopOnly>
              <MobileOnly>
                <span className="numbers">
                  {pipe(prop('other_ministers'), length)(prospect)}
                </span>
              </MobileOnly>
            </p>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
