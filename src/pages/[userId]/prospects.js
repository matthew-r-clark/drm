import { useRouter } from 'next/router';
import Grid from '../../utils/Grid';
import styled from '@emotion/styled';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;

  const Container = styled.div`


  .first-col {
    grid-column: 1/ span 2;
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
  `;

const prospects = [
  {
    name: "Jon Smith",
    status: "contacted",
    last_contacted: "07/13",
    notes: "Left a voicemail",
    others: "Reagann Smith",
    pledge: false
  },
  {
    name: "Matt Clark",
    status: "pledged, no amount",
    last_contacted: "06/21",
    notes: "Need to follow up",
    others: "Danielle Clark",
    pledge: true
  },
];

  return (
    <Container>
      <h1 style={{ marginLeft: '1rem' }}>Prospects for {userId}</h1>
      <Grid cols={12}>
        <h3 className="first-col">Name</h3>
        <h3 className="second-col">Status</h3>
        <h3 className="third-col">Last Contacted</h3>
        <h3 className="fourth-col">Notes</h3>
        <h3 className="fifth-col">Other Connected Ministers</h3>
        <h3 className="sixth-col">Pledge</h3>
      </Grid>

      {prospects.map((prospect) => (
        <Grid key={prospect.id} cols={12}>
        <p className="first-col">{prospect.name}</p>
        <p className="second-col">{prospect.status}</p>
        <p className="third-col">{prospect.last_contacted}</p>
        <p className="fourth-col">{prospect.notes}</p>
        <p className="fifth-col">{prospect.others}</p>
        <p className="sixth-col">{prospect.pledge ? "Yes" : "No"}</p>
        </Grid>
      ))}

    </Container>
  );
}
