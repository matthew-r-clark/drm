import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  IconButton,
  SwipeableDrawer,
} from '@material-ui/core';
import { Menu, ChevronLeft } from '@material-ui/icons';
import styled from '@emotion/styled';
import {
  last,
  pipe,
  prop,
  split,
} from 'ramda';
import { DesktopOnly, MobileOnly } from 'components/MediaQuery';
import MenuButtons from 'components/MenuButtons';
import colors from 'styles/colors';

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color:${colors.blue} ;
  color: ${colors.white};
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const capitalize = (text) => {
  if (text) {
    return text[0].toUpperCase() + text.slice(1);
  }
  return text;
};

export default function Wrapper({ children }) {
  const router = useRouter();
  const currentPage = pipe(
    prop('pathname'),
    split('/'),
    last,
    capitalize,
  )(router);
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleMenuClosed = () => setOpenMenu(false);
  const toggleMenuOpened = () => setOpenMenu(true);

  return (
    <div>
      <Head>
        <title>{currentPage}</title>
      </Head>

      <MobileOnly>
        <Header>
          Fundraising Tracker
        </Header>
      </MobileOnly>

      <nav>
        <DesktopOnly>
          <MenuButtons />
        </DesktopOnly>
        <MobileOnly>
          <IconButton
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 5000,
              marginBottom: '1rem',
            }}
            onClick={toggleMenu}
          >
            {openMenu ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <SwipeableDrawer
            open={openMenu}
            onClose={toggleMenuClosed}
            onOpen={toggleMenuOpened}
          >

            <MenuButtons toggleMenu={toggleMenu} />

          </SwipeableDrawer>
        </MobileOnly>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}
