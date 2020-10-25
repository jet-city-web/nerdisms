// import App from 'next/app'
import Link from 'next/link'

import XKCD from '../components/xkcd.js';
import Contact from '../components/contact.js';
import '../design/design.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <img src='/assets/nerdisms-banner-logo-full-color.png' alt="Nerdisms" />
        <nav>
          <span className="amber">baldy@nerdisms.io $</span>
          <span>nerdisms</span>
          <ul>
            <li><Link href="/">--home</Link></li>
            <li><Link href="/add">--add</Link></li>
            <li><Link href="/fridge">--fridge</Link></li>
            <li><Link href="/friends">--friends</Link></li>
            <li><Link href="/gear">--store</Link></li>
          </ul>
          <span className="blink">_</span>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer>
        <XKCD />
        <Contact />
      </footer>
    </>
  );
}

export default MyApp
