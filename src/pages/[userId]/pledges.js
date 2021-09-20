import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { path, prop } from 'ramda';
import Grid from '@material-ui/core/Grid';
import { DesktopOnly } from '../../components/MediaQuery';

export default function Pledges() {
  const router = useRouter();
  const { userId } = router.query;
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

  const pledges = [
    {
      id: 1,
      names: ['Jon smith'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '07/13',
      notes: ['Meeting up on 08/27', 'Left a voicemail', 'Emailed'],
      other_ministers: ['Reagann Smith', 'Ryan Bristow'],
      confirmed: true,
      admin_notes: ['Confirmed payment'],
      fees_covered: false,
      pledge_amount: '$15,000',
    },
    {
      id: 2,
      names: ['Matt Clark'],
      preferred_name: null,
      status: 'pledged, no amount',
      last_contacted: '06/21',
      notes: ['Need to follow up'],
      other_ministers: ['Danielle Clark'],
      confirmed: false,
      admin_notes: [],
      fees_covered: false,
      pledge_amount: null,
    },
    {
      id: 3,
      names: ['Mitchell Pavel'],
      preferred_name: null,
      status: 'contacted',
      last_contacted: '06/30',
      notes: ['Wants to donate, partnering with the wife'],
      other_ministers: [],
      confirmed: true,
      admin_notes: ['Need wifes name for records'],
      fees_covered: true,
      pledge_amount: '$1,000,000',
    },
    {
      id: 4,
      names: ['Bob Chin'],
      preferred_name: null,
      status: 'No answer',
      last_contacted: '07/01',
      notes: ['Left voicemail', 'Attempted contact; No response.'],
      other_ministers: [],
      confirmed: false,
      admin_notes: [],
      fees_covered: false,
      pledge_amount: null,
    },
  ];

  return (
    <>
      <Container>
        <h1 style={{ marginLeft: '1rem' }}>Pledges for {userId}</h1>
        <Grid container spacing={0} className="columns">
          <Grid item md={1} xs={2}>
            <h4>Status</h4>
          </Grid>
          <Grid item md={2} xs={3}>
            <h4>Admin Notes</h4>
          </Grid>
          <Grid item md={2} xs={3}>
            <h4>Name</h4>
          </Grid>
          <DesktopOnly>
            <Grid item md={3}>
              <h4>Notes</h4>
            </Grid>
          </DesktopOnly>
          <Grid item md={2} xs={2}>
            <h4>Pledge Amount</h4>
          </Grid>
          <Grid item md={1} xs={2}>
            <h4>Fees covered</h4>
          </Grid>
        </Grid>
        {pledges.map((pledge) => (
          <Grid
            container
            spacing={1}
            key={pledge.id}
            className="striped columns"
          >
            <Grid item md={1} xs={2}>
              <p>{prop('confirmed', pledge) ? 'confirmed' : 'pending'}</p>
            </Grid>
            <Grid item md={2} xs={3}>
              <p>{path(['admin_notes', '0'], pledge)}</p>
            </Grid>
            <Grid item md={2} xs={3}>
              <p>{path(['names', '0'], pledge)}</p>
            </Grid>
            <DesktopOnly>
              <Grid item md={3}>
                <p>{path(['notes', '0'], pledge)}</p>
              </Grid>
            </DesktopOnly>
            <Grid item md={2} xs={2}>
              <p>{prop('pledge_amount', pledge)}</p>
            </Grid>
            <Grid item md={1} xs={2}>
              <p>{prop('fees_covered', pledge) ? 'Yes' : 'No'}</p>
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
}
