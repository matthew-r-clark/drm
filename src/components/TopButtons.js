import Link from '@material-ui/core/Link';
import styled from '@emotion/styled';
import {
  Button,
} from '@material-ui/core';
import Grid from '../utils/Grid';
import { DesktopOnly, MobileOnly } from './MediaQuery';

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
`;

const MobileContainer = styled.div`
background: #0079D3;
color: white;
Button {
    color: white;
}
`;

export default function Links({ toggleMenu }) {
  const userId = 'qui-gonj';
  return (

    <>
      {/* Mobile Menu */}
      <MobileOnly>
        <MobileContainer>
          <Grid style={{ justifyItems: 'center' }} cols={1} rows={5}>
            <Link href={`/${userId}/prospects`}>
              <Button onClick={toggleMenu}>
                Prospects
              </Button>
            </Link>
            <Link href={`/${userId}/pledges`}>
              <Button onClick={toggleMenu}>
                Pledges
              </Button>
            </Link>
            <Link href="/ministry-partners">
              <Button onClick={toggleMenu}>
                Partners
              </Button>
            </Link>
            <Link href="/ministers">
              <Button onClick={toggleMenu}>
                Ministers
              </Button>
            </Link>
            <Link href="/">
              <Button onClick={toggleMenu}>
                Logout
              </Button>
            </Link>
          </Grid>
        </MobileContainer>
      </MobileOnly>

      {/* Desktop Menu */}
      <DesktopOnly>
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
      </DesktopOnly>
    </>
  );
}
