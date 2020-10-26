// import App from 'next/app'


import XKCD from '../components/xkcd.js';
import Social from '../components/social.js';
import Header from '../components/header.js';
import '../design/design.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <footer>
        <XKCD />
        <Social />
      </footer>
    </>
  );
}

export default MyApp
