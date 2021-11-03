import Link from 'next/link';
import { signOut } from 'next-auth/client'
import styled from '@emotion/styled';
import { Button, List, ListItem } from '@material-ui/core';
import { DesktopOnly, MobileOnly } from 'components/MediaQuery';
import colors from 'styles/colors';

const Logo = styled.div`
  grid-column: 1/6;
  font-size: 1.5rem;
`;

const Navigation = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin-left: 1rem;
  align-items: center;
  height: 50px;
`;

const Menu = styled.div`
  grid-column-start: 6;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Profile = styled.div`
  grid-column: 11/12;
  font-size: 0.75rem;
  justify-self: end;
`;

const SignOutButton = styled(Button)({ color: colors.white });

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
              <ListItem key={link.href}>
                <Link href={link.href}>
                  <Button onClick={toggleMenu}>{link.text}</Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </MobileContainer>
      </MobileOnly>
      {/* Desktop Menu */}
      <DesktopOnly>
        <Container>
          <Navigation>
            <Logo>Fundraising Tracker</Logo>
            <Menu>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.text}
                </Link>
              ))}
            </Menu>
            <Profile>
              <SignOutButton onClick={signOut}>
                Sign Out
              </SignOutButton>
            </Profile>
          </Navigation>
        </Container>
      </DesktopOnly>
    </>
  );
}
