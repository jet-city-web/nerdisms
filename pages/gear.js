import Head from 'next/head'

import Link from 'next/link'



export default function Home() {

  return (
    <>
      <Head>
        <title>Nerdisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <header>
          <img className="page-header-baldy" src="/assets/baldy-sm-eyes-straight.png" />
          <h1>Nerdisms.gear</h1>
        </header>

        <div id="gear"></div>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.spread_shop_config = { shopName: 'nerdisms', locale: 'us_US', prefix: 'https://www.nerdisms.io/gear', baseId: 'gear' };`
          }}
        />

        <script type="text/javascript" src="https://shop.spreadshirt.com/shopfiles/shopclient/shopclient.nocache.js"></script>

      </main>
    </>

  )
}
