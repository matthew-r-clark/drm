import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Drawer,
  IconButton,
  SwipeableDrawer,
} from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';
import styled from '@emotion/styled';
import { DesktopOnly, MobileOnly } from './MediaQuery';
import MenuButtons from './MenuButtons';
import Spacer from './Spacer';
import { last, pipe, prop, split } from 'ramda';

const drawerWidth = 142;
const headerHeight = 50;

const Header = styled.div`
  width: 100%;
  height: ${headerHeight}px;
  background-color: gray;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  @media (min-width: 960px) {
    padding-left: ${drawerWidth}px;
  }
`;

const Main = styled.main`
  /* padding-top: ${headerHeight}px; */
  @media (min-width: 960px) {
    padding-left: ${drawerWidth}px;
  }
`;

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

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
      <Header>
        <DesktopOnly>Donor Relationship Management</DesktopOnly>
        <MobileOnly>DRM</MobileOnly>
      </Header>
      <nav>
        <DesktopOnly>
          <Drawer variant="permanent" anchor="left" open>
            <MenuButtons />
          </Drawer>
        </DesktopOnly>
        <MobileOnly>
          <IconButton
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 5000,
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
            <Spacer height={30} />
            <MenuButtons toggleMenu={toggleMenu} />
          </SwipeableDrawer>
        </MobileOnly>
      </nav>
      <Main>
        {children}
      </Main>
    </div>
  );
}
