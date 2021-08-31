import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '@@store';
import Wrapper from '../components/Wrapper';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}

export default MyApp;
