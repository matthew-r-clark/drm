import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { IconButton, SwipeableDrawer } from '@material-ui/core';
import { Menu, ChevronLeft } from '@material-ui/icons';
import styled from '@emotion/styled';
import {
  last,
  path,
  pipe,
  prop,
  split,
} from 'ramda';

import { GlobalError, GlobalSuccess } from 'components/Alert';
import { DesktopOnly, MobileOnly } from 'components/MediaQuery';
import MenuButtons from 'components/MenuButtons';
import { updatePartners, emptyPartners } from 'modules/store/partners';
import { updateMinisters, emptyMinisters } from 'modules/store/ministers';
import { getPartners } from 'modules/partners';
import { getMinisters } from 'modules/ministers';
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

const getCurrentPage = pipe(
  prop('pathname'),
  split('/'),
  last,
  capitalize,
);

export default function Wrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleMenuClosed = () => setOpenMenu(false);
  const toggleMenuOpened = () => setOpenMenu(true);

  const isAuthorized = useSelector(path(['authorization', 'isAuthorized']));

  const {
    data: partnersList,
    // isLoading: isLoadingPartnersList,
    error: partnersListError,
  } = getPartners();
  const {
    data: ministersList,
    // isLoading: isLoadingMinistersList,
    error: ministersListError,
  } = getMinisters();

  useEffect(() => {
    if (isAuthorized && partnersList) {
      dispatch(updatePartners(partnersList));
    } else if (!isAuthorized) {
      dispatch(emptyPartners());
    }
  }, [isAuthorized, partnersList]);

  useEffect(() => {
    if (isAuthorized && ministersList) {
      dispatch(updateMinisters(ministersList));
    } else if (!isAuthorized) {
      dispatch(emptyMinisters());
    }
  }, [isAuthorized, ministersList]);

  useEffect(() => {
    if (partnersListError) {
      console.error('Error loading partners list:', partnersListError);
    }
    if (ministersListError) {
      console.error('Error loading ministers list:', ministersListError);
    }
  }, [partnersListError, ministersListError]);

  return (
    <div>
      <Head>
        <title>{getCurrentPage(router)}</title>
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
        <GlobalSuccess />
        <GlobalError />
        {children}
      </main>
    </div>
  );
}
