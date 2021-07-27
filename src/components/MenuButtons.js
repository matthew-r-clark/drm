import Link from 'next/link';
import styled from '@emotion/styled';
import {
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import Grid from './utils/Grid';
import { DesktopOnly, MobileOnly } from './MediaQuery';
import {white, blue} from '../styles/colors';

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
background: ${blue};
color: ${white};
height: 50px;
a {
    color: ${white};
    border-bottom: 2px solid ${blue};
}

a:hover {
  border-bottom: 2px solid ${white};
}
`;

const MobileContainer = styled.div`
height: 100%;
margin: 0;
padding-top: 2rem;
background: ${blue};
color: ${white};
Button {
    color: ${white};
}
`;

export default function MenuButtons({ toggleMenu }) {
  const userId = 'qui-gonj';
  const links = [
    {
      href: `/${userId}/prospects`,
      text: 'Prospects',
    },
    {
      href: `/${userId}/pledges`,
      text: 'Pledges',
    },
    {
      href: '/ministry-partners',
      text: 'Partners',
    },
    {
      href: '/ministers',
      text: 'Ministers',
    },
  ];
  return (
    <>
      {/* Mobile Menu */}
      <MobileOnly>
        <MobileContainer>
          <List>
            {links.map((link) => (
              <ListItem>
                <Link href={link.href}>
                  <Button onClick={toggleMenu}>
                    {link.text}
                  </Button>
                </Link>
              </ListItem>
            ))}
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
              {links.map((link) => (
                <Link href={link.href}>
                  {link.text}
                </Link>
              ))}
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
