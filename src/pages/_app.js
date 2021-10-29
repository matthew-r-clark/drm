import 'styles/globals.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import store from 'modules/store';
import Wrapper from 'components/Wrapper';

import theme from 'styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
