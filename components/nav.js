import useWindowSize from '../hooks/windowSize.js';
import { If, Then, Else } from 'react-if';
import Link from 'next/link'

export default function Nav() {

  const size = useWindowSize();

  return (
    <If condition={size.width >= 725}>
      <Then>
        <Desktop />
      </Then>
      <Else>
        <Mobile />
      </Else>
    </If>
  );
}

function Desktop() {
  return (
    <nav>
      <span className="amber">baldy@nerdisms.io $</span>
      <label htmlFor="toggle">nerdisms</label>
      <input type="checkbox" id="toggle" />
      <ul>
        <li><Link href="/">--home</Link></li>
        <li><Link href="/add">--add</Link></li>
        <li><Link href="/fridge">--fridge</Link></li>
        <li><Link href="/friends">--friends</Link></li>
        <li><Link href="/gear">--store</Link></li>
      </ul>
      <span className="blink">_</span>
    </nav>
  );
}

function Mobile() {
  return (
    <nav>
      <span className="amber">$</span>
      <label htmlFor="toggle">nerdisms</label>
      <ul>
        <li><Link href="/add">--add</Link></li>
        <li><Link href="/friends">--friends</Link></li>
        <li><Link href="/gear">--store</Link></li>
      </ul>
      <span className="blink">_</span>
    </nav>
  );
}
