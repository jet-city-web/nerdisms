// import App from 'next/app'


import XKCD from '../components/xkcd.js';
import Social from '../components/social.js';
import Header from '../components/header.js';

// 3rd Party Componenrts with styles can only be loaded at the main document level in Next.js
import "react-alice-carousel/lib/alice-carousel.css";
import 'react-responsive-modal/styles.css';

// Our actual design
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
