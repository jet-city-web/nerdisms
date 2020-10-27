import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nerdisms: Friends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header>
          <img className="page-header-baldy" src="/assets/baldy-sm-sunglasses.png" />
          <h1>Other cool `ism and meme sites </h1>
        </header>

        <section className="grid">

          <aside>
            <h3>XKCD</h3>
            A comic for us.
            <footer>
              <Link href="https://xkcd.com/">https://xkcd.com/</Link>
            </footer>
          </aside>

          <aside>
            <h3>CSS Puns</h3>
            CSS Selectors gone batty
            <footer>
              <Link href="https://saijogeorge.com/css-puns/">https://saijogeorge.com/css-puns/</Link>
            </footer>
          </aside>

          <aside>
            <h3>#bada55</h3>
            Off color color codes
            <footer>
              <Link href="http://bada55.io/">http://bada55.io/</Link>
            </footer>
          </aside>



        </section>

        <footer><em>Like us many of our friends sell cool shirts and other merch. Support them! We all love bringing some levity into your hectic lives.</em></footer>

      </main>
    </>

  )
}
