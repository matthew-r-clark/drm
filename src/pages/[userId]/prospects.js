import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  pipe, join, length, path, prop, ifElse,
} from 'ramda';
import { format } from 'date-fns';
import add from 'date-fns/add';
import Grid from '@material-ui/core/Grid';
import { DesktopOnly, MobileOnly } from '../../components/MediaQuery';
import { getProspects } from '../../modules/partners';
import { getMinisterById } from '../../modules/ministers';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;
  const {
    data: prospects,
    isLoading: isLoadingProspects,
    error: prospectsError,
  } = getProspects(userId);
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = getMinisterById(`${userId}`);
  const joinOtherMinisters = pipe(prop('other_ministers'), join(', '));
  const getPreferredName = ifElse(
    prop('nickname'),
    prop('nickname'),
    path(['aliases', 0]),
  );
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

  return (
    <Container>
      {isLoadingUser && <h1>Loading user...</h1>}
      {user && <h1>Prospects for {user.first_name}</h1>}
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
      {isLoadingProspects && <h1>Loading data...</h1>}
      {prospects
        && prospects.map((prospect) => (
          <Grid
            container
            spacing={1}
            key={prospect.id}
            className="striped columns"
          >
            <Grid item md={2} xs={3}>
              <p>{getPreferredName(prospect)}</p>
            </Grid>
            <Grid item md={2} xs={3}>
              <p>{prop('status', prospect)}</p>
            </Grid>
            <Grid item md={2} xs={3}>
              <p>
                {/* Days are showing a day behind what is in the DB. Adding a day to resolve it. */}
                {format(
                  add(new Date(prop('last_contacted', prospect)), { days: 1 }),
                  'LLLL eo',
                )}
              </p>
            </Grid>
            <DesktopOnly>
              <Grid item md={3}>
                <p>{path(['notes', 'prospect', '0'], prospect)}</p>
              </Grid>
            </DesktopOnly>
            <Grid item md={2} xs={3}>
              <p>
                <DesktopOnly>{joinOtherMinisters(prospect)}</DesktopOnly>
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
