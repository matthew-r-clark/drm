import 'styles/globals.css';
import { Provider } from 'react-redux';
import store from 'modules/store';
import Wrapper from 'components/Wrapper';
import { Provider as AuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
