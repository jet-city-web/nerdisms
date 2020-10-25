import Head from 'next/head'
import { read } from './api/isms';


import Ism from '../components/ism.js';

export default function Home(props) {

  const isms = props.isms || [];

  return (
    <>
      <Head>
        <title>Nerdisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="isms">
          {
            isms.map((ism, idx) => <Ism key={idx} ism={ism} />)
          }
        </section>
      </main>
    </>

  )
}

export async function getStaticProps() {
  const isms = await read();
  return { props: { isms } };
}
