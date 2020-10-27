import Head from 'next/head'
import { read } from './api/isms';

import Isms from '../components/isms.js';

export default function Home(props) {

  const isms = props.isms || [];

  return (
    <>
      <Head>
        <title>Nerdisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Isms isms={isms} />
      </main>
    </>

  )
}

export async function getStaticProps() {
  const isms = await read();
  return { props: { isms } };
}
