// import App from 'next/app'


import XKCD from '../components/xkcd.js';
import Social from '../components/social.js';
import Header from '../components/header.js';

import 'react-responsive-modal/styles.css';
import '../design/design.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <div className="footer">
        <XKCD />
        <Social />
      </div>
    </>
  );
}

export default MyApp
