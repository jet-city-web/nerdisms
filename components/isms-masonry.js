import Masonry from 'react-masonry-css'
import usePreventScroll from '../hooks/preventScrollOnSwipe.js';

export default function Isms({ cards, category }) {

  usePreventScroll();

  const breakpoints = {
    default: 3,
    1100: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="masonry-isms"
      columnClassName="masonry-isms-column">
      {cards}
    </Masonry>
  );
}
