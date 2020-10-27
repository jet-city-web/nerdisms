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
          <h1><Link href="http://www.nerdisms.gear">Nerdisms.gear</Link></h1>
        </header>


        <p>
          Only the best of the best (or the ones that get the biggest eye rolls) make the cut.  Shop our store for the best Nerdisms (as voted by you) T-Shirts, Mugs and Stickers.
        </p>


        <h2>Paying it Forward</h2>
        <p>
          As it would be impossible for us to cut everyone that submits a great Nerdism in on the sales, what we've decided to do is to donate 30% of our gross sales to causes that make a difference. We certainly have our favorites, but you have some suggestions, please <Link href="/contact">leave us a note</Link> and we'll potentially get them into the rotation. Look for messaging on social media each month to see how well we're doing!
        </p>

        <section className="grid">
          <aside><strong>10%</strong> will go the <Link href="https://www.codefellows.org/scholarship-fund/">Code Fellows Diversity Scholarship Fund</Link>, which targets diverse career changers with the funds they need to get started in the field of computer programming </aside>

          <aside><strong>10%</strong> will go <Link href="https://www.charitywater.org/">Charity Water</Link>, which has as it's mission to bring clean water to everyone on the planet</aside>

          <aside><strong>10%</strong> will go to a rotating set of organizations that focus on a range of services from education, assisting single parents, providing food, and whatever bubbles up as the most pressing need</aside>
        </section>

      </main>
    </>

  )
}
