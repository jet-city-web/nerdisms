import { useEffect } from 'react';

import Head from 'next/head'

import Link from 'next/link'

export default function Home() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>Nerdisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <div id="store"></div>

        <script dangerouslySetInnerHTML={{ __html: `window.spread_shop_config = { shopName:'nerdisms', locale:'us_US', prefix:'https://shop.spreadshirt.com', baseId:'store' }` }} />

      </main>
    </>

  )
}
