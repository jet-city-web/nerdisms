import AliceCarousel from 'react-alice-carousel';
import usePreventScroll from '../hooks/preventScrollOnSwipe.js';

export default function Isms({ cards, category }) {

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

  return (
    <section className="isms" key={Math.random()}>
      <AliceCarousel
        disableDotsControls={true}
        autowidth
        mouseTracking
        infinite
        paddingLeft={30}
        paddingRight={30}
        // responsive={responsive}
        items={cards}
      />
    </section>
  );

}
