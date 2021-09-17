import styled from '@emotion/styled';
import CheckIcon from '@material-ui/icons/Check';
import { prop } from 'ramda';
import Grid from '@material-ui/core/Grid';
import { DesktopOnly, MobileOnly } from 'components/MediaQuery';

const Container = styled.div`
  overflow-wrap: break-word;
  h1 {
    margin-left: 1rem;
  }

  .columns {
    margin-left: -1rem;
    padding-left: 2rem;
  }

  .striped:nth-of-type(2n) {
    background: #f5f5f5;
  }

  @media (max-width: 960px) {
    font-size: 0.7rem;
    text-align: center;
    overflow-wrap: break-word;

    h1 {
      margin: 0;
    }

    .columns {
      margin-left: 0;
      padding-left: 0;
    }
  }
`;

const ministers = [
  {
    id: 1,
    name: 'Reagann Smith',
    email: 'reagann.smith@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: false,
    coach: 'Ryan Bristow',
    goal: '2,000',
  },
  {
    id: 2,
    name: 'Danielle Rodriguez-Clark',
    email: 'danielle.clark@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: false,
    coach: 'Brandon Worsham',
    goal: '2,000',
  },
  {
    id: 3,
    name: 'Ryan Bristow',
    email: 'ryan.bristow@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: false,
    coach: null,
    goal: '2,000',
  },
  {
    id: 4,
    name: 'Paul Ueng',
    email: 'paul.ueng@anyfocus.org',
    isActive: true,
    isAdmin: true,
    isApprentice: false,
    coach: null,
    goal: null,
  },
  {
    id: 5,
    name: 'Becca Wilson',
    email: 'becca.wilson@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: true,
    coach: 'Drew Cleveland',
    goal: '1,700',
  },
];

export default function Ministers() {
  return (
    <Container>
      <h1>Ministers</h1>
      <Grid container spacing={0} className="columns">
        <Grid item md={2} xs={3}>
          <h4>Name</h4>
        </Grid>
        <Grid item md={2} xs={3}>
          <h4>Email</h4>
        </Grid>
        <DesktopOnly>
          <Grid item md={2}>
            <h4>Admin</h4>
          </Grid>
          <Grid item md={2}>
            <h4>Apprentice</h4>
          </Grid>
        </DesktopOnly>
        <MobileOnly>
          <Grid item xs={1}>
            <h4>A</h4>
          </Grid>
          <Grid item xs={1}>
            <h4>App</h4>
          </Grid>
        </MobileOnly>
        <Grid item md={2} xs={2}>
          <h4>Coach</h4>
        </Grid>
        <Grid item md={2} xs={2}>
          <h4>Goal</h4>
        </Grid>
      </Grid>

      {ministers.map((minister) => (
        <Grid
          container
          spacing={0}
          className="striped columns"
          key={minister.id}
        >
          <Grid item md={2} xs={3}>
            <p>{prop('name', minister)}</p>
          </Grid>
          <Grid item md={2} xs={3}>
            <p>{prop('email', minister)}</p>
          </Grid>
          <Grid item md={2} xs={1}>
            <p>{prop('isAdmin', minister) && <CheckIcon />}</p>
          </Grid>
          <Grid item md={2} xs={1}>
            <p>{prop('isApprentice', minister) && <CheckIcon />}</p>
          </Grid>
          <Grid item md={2} xs={2}>
            <p>{prop('coach', minister)}</p>
          </Grid>
          <Grid item md={2} xs={2}>
            <p>{prop('goal', minister)}</p>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
