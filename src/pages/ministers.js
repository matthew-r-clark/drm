import styled from '@emotion/styled';
import CheckIcon from '@material-ui/icons/Check';
import {
  pipe, join, prop, propOr,
} from 'ramda';
import Grid from '../components/utils/Grid';
import { DesktopOnly, MobileOnly } from '../components/MediaQuery';

const getName = propOr('--', 'name');
const getEmail = propOr('--', 'email');
const getAdminStatus = prop('isAdmin');
const getApprenticeStatus = prop('isApprentice');
const getCoachStatus = prop('isCoach');
const joinCoachees = pipe(
  prop('coachees'),
  join(', '),
);
const getGoal = propOr('--', 'goal');

const Container = styled.div`
  h1 {
    margin-left: 1rem;
  }

  .columns {
    margin-left: -1rem;
    padding-left: 2rem;
  }

  .name-col {
    grid-column: 1/ span 2;
  }

  .email-col {
    grid-column: 3/ span 2;
  }

  .admin-col {
    grid-column: 5/ span 1;
    text-align: center;
  }

  .apprentice-col {
    grid-column: 6 / span 1;
    text-align: center;
  }

  .coach-col {
    grid-column: 7 / span 1;
    text-align: center;
  }

  .coachees-col {
    grid-column: 8 / span 3;
  }

  .goal-col {
    grid-column: 12 / span 1;
  }

  .striped:nth-of-type(2n) {
    background: #F5F5F5;
  }

  @media (max-width: 800px){
    font-size: .7rem;
    text-align: center;
    overflow-wrap: break-word;
    border: 1px solid black;

    h1{
      margin: 0;
    }

    .columns {
      margin-left: 0;
      padding-left: 0;
      border: 1px solid black;
    }

    .name-col {
      grid-column: 1/span 2;
    }

    .email-col {
      grid-column: 3/ span 4;
    }

    .admin-col {
      grid-column: 7/ span 1;
      border: 1px solid black;
    }

    .apprentice-col {
      grid-column: 8 / span 1;
      border: 1px solid black;
    }

    .coach-col {
      grid-column: 9 / span 1;
      border: 1px solid black;
    }

    .coachees-col {
      grid-column: 10 / span 2;
      border: 1px solid black;
    }

    .goal-col {
      grid-column: 12 / span 1;
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
    isCoach: false,
    coachees: [],
    goal: '2,000',

  },
  {
    id: 2,
    name: 'Danielle Rodriguez-Clark',
    email: 'danielle.clark@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: false,
    isCoach: false,
    coachees: [],
    goal: '2,000',
  },
  {
    id: 3,
    name: 'Ryan Bristow',
    email: 'ryan.bristow@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: false,
    isCoach: true,
    coachees: ['Reagann Smith', 'Darby Cleveland'],
    goal: '2,000',
  },
  {
    id: 4,
    name: 'Paul Ueng',
    email: 'paul.ueng@anyfocus.org',
    isActive: true,
    isAdmin: true,
    isApprentice: false,
    isCoach: false,
    coachees: [],
    goal: null,
  },
  {
    id: 5,
    name: 'Becca Wilson',
    email: 'becca.wilson@anyfocus.org',
    isActive: true,
    isAdmin: false,
    isApprentice: true,
    isCoach: false,
    coachees: [],
    goal: '1,700',
  },
  {
    id: 6,
    name: null,
    email: null,
    isActive: true,
    isAdmin: false,
    isApprentice: true,
    isCoach: false,
    coachees: [],
    goal: '1,700',
  },

];

export default function Ministers() {
  return (
    <Container>
      <h1>Ministers</h1>
      <Grid className="columns" cols={12}>
        <h4 className="name-col">Name</h4>
        <h4 className="email-col">Email</h4>
        <DesktopOnly>
          <h4 className="admin-col">Admin</h4>
          <h4 className="apprentice-col">Apprentice</h4>
          <h4 className="coach-col">Coach</h4>
        </DesktopOnly>
        <MobileOnly>
          <h4 className="admin-col">A</h4>
          <h4 className="apprentice-col">App</h4>
          <h4 className="coach-col">C</h4>
        </MobileOnly>
        <h4 className="coachees-col">Coachees</h4>
        <h4 className="goal-col">Goal</h4>
      </Grid>
      {ministers.map((minister) => (

        <Grid className="striped columns" key={minister.id} cols={12}>
          <p className="name-col">{getName(minister)}</p>
          <p className="email-col">{getEmail(minister)}</p>
          <p className="admin-col">{getAdminStatus(minister) ? <CheckIcon /> : <span />}</p>
          <p className="apprentice-col">{getApprenticeStatus(minister) ? <CheckIcon /> : <span />}</p>
          <p className="coach-col">{getCoachStatus(minister) ? <CheckIcon /> : <span />}</p>
          <p className="coachees-col">
            {joinCoachees(minister)}
          </p>
          <p className="goal-col">{getGoal(minister)}</p>
        </Grid>
      ))}
    </Container>
  );
}
