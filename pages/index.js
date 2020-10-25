import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

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
            isms.map((ism, idx) =>
              <div key={idx} className="ism">
                <div className="front inside">
                  <div className="content">
                    <span>{ism.text}</span>
                  </div>
                  <footer>
                    <FontAwesomeIcon icon={faHeart} className="icon upvote" />
                    <FontAwesomeIcon icon={faThumbsDown} className="icon downvote" />
                  </footer>
                </div>
                {/* <div className="back">
                  <div>Contributor</div> <div>{ism.contributor}</div>
                  <div>Source</div> <div>{ism.source}</div>
                </div>
                */}
              </div>
            )
          }
        </section>
      </main>
    </>

  )
}

export async function getStaticProps() {
  const list = [
    {
      text: "!false",
      contributor: 'baldy',
      source: 'Code Fellows',
      upvotes: 5,
      downvotes: 1,
    },
    {
      text: "fear { display:none; }",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "['hip','hip']",
      contributor: 'Nicholas Carignan',
      source: 'unknown',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "/* no comment */",
      contributor: 'Sarah Fisher',
      source: 'meme',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "this one is like really long and not very funny, but we'll see, I guess",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "white space matters",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
  ];

  return { props: { isms: list } };
}
