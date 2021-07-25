import Link from 'next/link';
import styled from '@emotion/styled';
import {
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import Grid from '../utils/Grid';
import { DesktopOnly, MobileOnly } from './MediaQuery';
import colors from '../utils/colors';

const Logo = styled.div`
grid-column: 1/6;
font-size:1.5rem;
`;

const Menu = styled.div`
grid-column-start:6;
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 1rem;
`;

const Profile = styled.div`
grid-column:11/12;
font-size: .75rem;
justify-self: end;
`;

const Container = styled.div`
background: ${colors.blue};
color: ${colors.white};
height: 50px;
a {
    color: ${colors.white};
    border-bottom: 2px solid ${colors.blue};
}

a:hover {
  border-bottom: 2px solid ${colors.white};
}
`;

const MobileContainer = styled.div`
height: 100%;
margin: 0;
padding-top: 2rem;
background: ${colors.blue};
color: ${colors.white};
Button {
    color: ${colors.white};
}
`;

export default function MenuButtons({ toggleMenu }) {
  const userId = 'qui-gonj';
  return (
    <>
      {/* Mobile Menu */}
      <MobileOnly>
        <MobileContainer>
          <List>
            <ListItem>
              <Link href={`/${userId}/prospects`}>
                <Button onClick={toggleMenu}>
                  Prospects
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={`/${userId}/pledges`}>
                <Button onClick={toggleMenu}>
                  Pledges
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/ministry-partners">
                <Button onClick={toggleMenu}>
                  Partners
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/ministers">
                <Button onClick={toggleMenu}>
                  Ministers
                </Button>
              </Link>
            </ListItem>
          </List>
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
              <Link href={`/${userId}/prospects`}>
                Prospects
              </Link>
              <Link href={`/${userId}/pledges`}>
                Pledges
              </Link>
              <Link href="/ministry-partners">
                Partners
              </Link>
              <Link href="/ministers">
                Ministers
              </Link>
            </Menu>
            <Profile>
              <Link href="/">
                Log out
              </Link>
            </Profile>
          </Grid>
        </Container>
      </DesktopOnly>
    </>
  );
}
