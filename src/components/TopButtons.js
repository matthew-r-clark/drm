import Link from '@material-ui/core/Link';
import styled from '@emotion/styled';
import Grid from '../utils/Grid';

const Logo = styled.div`
grid-column: 1/6;
font-size:1.5rem;
`;

const Menu = styled.div`
grid-column-start:6;


.link {
    margin: 0 1rem;
}
`;

const Profile = styled.div`
grid-column:11/12;
font-size: .75rem;
justify-self: end;
`;

const Container = styled.div`
background: #0079D3;
color: white;
height: 50px;
a {
    color: white;
}
;
`;

export default function Links() {
  const userId = 'qui-gonj';
  return (
    <Container>

      <Grid style={{ alignItems: 'center', height: '50px' }} cols={12} rows={1}>
        <Logo>
          Fundraising Tracker
        </Logo>
        <Menu>

          <Link className="link" href={`/${userId}/prospects`}>
            Prospects
          </Link>
          <Link className="link" href={`/${userId}/pledges`}>
            Pledges
          </Link>
          <Link className="link" href="/ministry-partners">
            Partners
          </Link>
          <Link className="link" href="/ministers">
            Ministers
          </Link>
        </Menu>
        <Profile>
        <Link className="link" href="/">
          Log out
          </Link>
        </Profile>

      </Grid>
    </Container>
  );
}
