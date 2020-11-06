import { useEffect, useState } from 'react';
import { Switch, Case, Default } from 'react-if';

import Ism from './ism.js';
import Swipable from './isms-swipeable.js';
import Masonry from './isms-masonry.js';
import Raw from './isms-raw.js';

import useWindowSize from '../hooks/windowSize.js';

export default function Isms({ isms }) {

  const size = useWindowSize();
  const [category, setCategory] = useState('all');
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState({});

  const changeCategory = (cat) => {
    setCategory(cat);
    setCards(allCards[cat]);
  }

  useEffect(() => {

    let all = [];
    const list = Object.keys(isms).reduce((items, itemCategory) => {
      items[itemCategory] = isms[itemCategory].map(ism => <Ism key={Math.random()} ism={ism} />);
      all = all.concat(items[itemCategory]);
      return items
    }, []);

    list['all'] = all;
    setAllCards(list);

  }, []);

  useEffect(() => {
    changeCategory('all');
  }, [allCards])

  return (
    <>
      <nav className="isms-filter">

        <button
          className={category === "all" ? 'active' : ''}
          onClick={() => changeCategory('all')}
          key={Math.random()}
        >All</button>

        {
          Object.keys(isms).map((cat) =>
            <button
              className={cat === category ? 'active' : ''}
              onClick={() => changeCategory(cat)}
              key={Math.random()}
            >{cat}</button>
          )
        }

      </nav>

      <Switch>
        <Case condition={size.width < 768}>
          <Swipable cards={cards} category={category} />
        </Case>
        <Case condition={size.width >= 768}>
          <Masonry cards={cards} category={category} />
        </Case>
        <Default>
          <Raw cards={cards} category={category} />
        </Default>
      </Switch>
    </>
  );

}
