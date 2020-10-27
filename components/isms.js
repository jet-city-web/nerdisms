import AliceCarousel from 'react-alice-carousel';
import usePreventScroll from '../hooks/preventScrollOnSwipe.js';
import Ism from './ism.js';

export default function Isms({ isms }) {

  usePreventScroll();

  const responsive = {
    0: {
      items: 1
    },
    720: {
      items: 2
    },
    1100: {
      items: 3
    },
    1448: {
      items: 4
    },
    1900: {
      items: 5
    },
    2300: {
      items: 6
    }
  };

  const categories = Object.keys(isms).reduce((cats, category) => {
    const items = isms[category].map(ism => <Ism key={Math.random()} ism={ism} />)
    const section = (
      <section className="isms" key={Math.random()}>
        <h2>{category}</h2>
        <AliceCarousel
          disableDotsControls={true}
          autowidth
          mouseTracking
          infinite
          paddingLeft={30}
          paddingRight={30}
          responsive={responsive}
          items={items}
        />
      </section>
    );
    cats.push(section);
    return cats;
  }, []);

  return categories;

}
