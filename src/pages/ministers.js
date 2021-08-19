import styled from '@emotion/styled';
import Grid from '../components/utils/Grid';

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

.dark {
    background: #F5F5F5;
  }
`;

const ministers = [
  {
    id: 1,
    name: 'Reagann Smith',
    email: 'reagann.smith@anyfocus.org',
    isAdmin: false,
    isApprentice: false,
    isCoach: false,
    coachees: [],
    goal: "2,000"

  },
  {
    id: 2,
    name: 'Danielle Rodriguez-Clark',
    email: 'danielle.clark@anyfocus.org',
    isAdmin: false,
    isApprentice: false,
    isCoach: false,
    coachees: [],
    goal: "2,000"
  },
  {
    id: 3,
    name: 'Ryan Bristow',
    email: 'ryan.bristow@anyfocus.org',
    isAdmin: false,
    isApprentice: false,
    isCoach: true,
    coachees: ["Reagann Smith", "Darby Cleveland"],
    goal: "2,000"
  },
 {
  id: 4,
  name: "Paul Ueng",
  email: "paul.ueng@anyfocus.org",
  isAdmin: true,
  isApprentice: false,
  isCoach: false,
  coachees: [],
  goal: null 
 },
 {
  id: 5,
  name: "Becca Wilson",
  email: "becca.wilson@anyfocus.org",
  isAdmin: false,
  isApprentice: true,
  isCoach: false,
  coachees: [],
  goal: null 
 },

];

export default function Ministers() {
  return (
    <Container>
      <h1>Ministers</h1>
      <Grid className="columns" cols={12}>
        <h4 className="name-col">Name</h4>
        <h4 className="email-col">Email</h4>
        <h4 className="admin-col">Admin</h4>
        <h4 className="apprentice-col">Apprentice</h4>
        <h4 className="coach-col">Coach</h4>
        <h4 className="coachees-col">Coachees</h4>
        <h4 className="goal-col">Fundraising Goal</h4>
      </Grid>
      {ministers.map((minister) => (

        <Grid className={minister.id % 2 ? 'dark columns' : 'columns'} key={minister.id} cols={12}>
          <p className="name-col">{minister.name}</p>
          <p className="email-col">{minister.email}</p>
          <p className="admin-col">{minister.isAdmin ? <span>&#10003;</span> : ''}</p>
          <p className="apprentice-col">{minister.isApprentice ? <span>&#10003;</span> : ''}</p>
          <p className="coach-col">{minister.isCoach ? <span>&#10003;</span> : ''}</p>
          <p className="coachees-col">{minister.coachees.map((coachee, index) => (
            <span>
              {coachee}{minister.coachees.length > 1 && index !== minister.coachees.length - 1 ? ', ' : ''}
            </span>
          ))}</p>
          <p className="goal-col">{minister.goal ? minister.goal :  'N/A'}</p>
        </Grid>
      ))}
    </Container>
  );
}
