import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import io from 'socket.io-client';
import { read, update } from './api/magnets.js';

console.log('connecting');
const socket = io.connect(`${process.env.NEXT_PUBLIC_API}/magnets`);

export default function Fridge({ words }) {

  const [fridgeTop, setFridgeTop] = useState(0);
  const [fridgeLeft, setFridgeLeft] = useState(0);
  const [fridgeHeight, setFridgeHeight] = useState(0);
  const [fridgeWidth, setFridgeWidth] = useState(0);
  const [magnets, setMagnets] = useState(0);
  const [currentMagnet, setCurrentMagnet] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const itGotMoved = (magnet) => {
    console.log('somebody moved', magnet)
  }

  const grabIt = (e) => {
    // console.log(fridgeHeight, fridgeWidth);
    setCurrentMagnet(e.target);
    e.preventDefault();
  }

  const dragIt = (e) => {
    e.preventDefault();
    if (!currentMagnet) { return; }

    // Where the mouse actually is
    let top = e.pageY - fridgeTop - (currentMagnet.offsetHeight / 2);
    let bottom = top + currentMagnet.offsetHeight;
    let left = e.pageX - fridgeLeft - (currentMagnet.offsetWidth / 1.2);
    let right = left + currentMagnet.offsetWidth;

    // Constraints
    if (top <= 0) { top = 0 };
    if (bottom >= fridgeHeight) { top = fridgeHeight - currentMagnet.offsetHeight; };
    if (left <= 0) { left = 0 };
    if (right > fridgeWidth) { left = fridgeWidth - currentMagnet.offsetWidth; }


    // Visually move it
    currentMagnet.style.top = `${top}px`;
    currentMagnet.style.left = `${left}px`;

    const magnet = currentMagnet;
  }

  const dropIt = async (e) => {
    e.preventDefault();
    if (!currentMagnet) { return; }
    const id = currentMagnet.getAttribute('id');
    words[id].top = currentMagnet.style.top;
    words[id].left = currentMagnet.style.left;

    const magnet = {
      id: words[id]._id,
      word: words[id].word,
      left: words[id].left,
      top: words[id].top,
    }

    await update(magnet);
    socket.emit('move', magnet)

    setCurrentMagnet(null);
  }

  const placeWords = () => {
    const wordElements = Object.keys(words).map(word => addMagnet(word));
    setMagnets(wordElements);
    setLoaded(true);
  }

  const addMagnet = (id) => {
    // positionMagnet(magnet);
    return (
      <span
        key={id}
        id={id}
        className="magnet"
        onMouseDown={grabIt}
        style={{ top: words[id].top, left: words[id].left }}
      >
        {words[id].word}
      </span>
    )
  }

  const positionMagnet = (id, magnet) => {

    const allMagnets = document.getElementsByClassName('magnet');
    const magnetElement = document.getElementById(id)

    // Has it already been positioned?
    if (magnet.top || magnet.left) { return; }

    let rendered = false;

    let tries = 1;

    while (!rendered) {
      let isCollision = false;
      let top = randomNumberBetween(0, fridgeHeight - magnetElement.offsetHeight) + 'px';
      let left = randomNumberBetween(0, fridgeWidth - magnetElement.offsetWidth) + 'px';

      magnet.top = top;
      magnet.left = left;
      magnetElement.style.top = top;
      magnetElement.style.left = left;

      for (let i = 0; i <= allMagnets.length; i++) {
        if (allMagnets[i] === magnetElement) { continue; }
        isCollision = collisionBetween(magnetElement, allMagnets[i]);
        if (isCollision) { break; }
      }
      rendered = !isCollision;

      if (++tries === 10) { rendered = true; }
    }

  }

  const collisionBetween = (element1, element2) => {

    if (!element1 || !element2) { return false; }

    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
  }

  const randomNumberBetween = (min, max) => {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };



  // Set the dimensions and drop the magnets on the board
  useEffect(() => {
    const fridge = document.getElementById('fridge');
    setFridgeTop(fridge.getBoundingClientRect().top + window.scrollY);
    setFridgeLeft(fridge.getBoundingClientRect().left + window.scrollX);
    setFridgeHeight(fridge.scrollHeight);
    setFridgeWidth(fridge.scrollWidth);
    placeWords();
  }, [])

  useEffect(() => {
    socket.on('move', itGotMoved);
  }, [])

  // Randomize any magnets without a position
  useEffect(() => {
    if (loaded) {
      Object.keys(words).forEach(id => positionMagnet(id, words[id]))
    }
  }, [loaded])


  return (
    <>
      <Head>
        <title>Nerdisms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <section id="fridge" onMouseMove={dragIt} onMouseUp={dropIt}>{magnets}</section>

        <header>
          <img className="page-header-baldy" src="/assets/baldy-sm-eyes-up.png" />
          <h1>Fridge Magnets</h1>
        </header>

      </main>
    </>

  )
}

export async function getStaticProps() {
  const words = await read();
  return { props: { words } };
}
