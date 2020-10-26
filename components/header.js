import Nav from './nav.js';

import Link from 'next/link'

export default function Header() {

  return (
    <header>
      <Link href="/">
        <img src='/assets/nerdisms-banner-logo-full-color.png' alt="Nerdisms" />
      </Link>
      <Nav />
    </header>
  )
}
