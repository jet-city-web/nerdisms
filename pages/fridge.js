import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import io from 'socket.io-client';
import throttle from 'lodash.throttle';

import { read, update } from './api/magnets.js';

const socket = io.connect(`${process.env.NEXT_PUBLIC_API}/magnets`);

export default function Fridge() {

  const [fridgeTop, setFridgeTop] = useState(0);
  const [fridgeLeft, setFridgeLeft] = useState(0);
  const [fridgeHeight, setFridgeHeight] = useState(0);
  const [fridgeWidth, setFridgeWidth] = useState(0);
  const [magnets, setMagnets] = useState(0);
  const [currentMagnet, setCurrentMagnet] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [positioned, setPositioned] = useState(false);
  const [words, setWords] = useState([]);

  const itGotMoved = (magnet) => {

    const id = magnet._id;

    // Set it
    words[id].top = magnet.top;
    words[id].left = magnet.left;

    // Show it
    let movedMagnet = document.getElementById(id);
    movedMagnet.classList.remove('dropped');
    movedMagnet.classList.remove('moving');
    movedMagnet.style.top = magnet.top;
    movedMagnet.style.left = magnet.left;
    movedMagnet.classList.add('dropped');

  }

  const iAmMmoving = (magnet) => {

    const id = magnet.id;

    console.log(id, words[id]);

    // Set it
    words[id].top = magnet.top;
    words[id].left = magnet.left;

    // Show it
    let movedMagnet = document.getElementById(id);
    movedMagnet.classList.add('moving');
    movedMagnet.style.top = magnet.top;
    movedMagnet.style.left = magnet.left;

  }

  const throttledMove = throttle((magnet) => {
    socket.emit('moving', magnet)
  }, 250);

  const grabIt = (e) => {
    e.target.classList.remove('dropped');
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

    // Visually move it on our screen
    currentMagnet.style.top = `${top}px`;
    currentMagnet.style.left = `${left}px`;

    // Visually move it on everyone else's screen
    const magnet = {
      id: currentMagnet.getAttribute('id'),
      top: `${top}px`,
      left: `${left}px`
    }
    throttledMove(magnet);

  }

  const dropIt = async (e) => {
    e.preventDefault();

    if (!currentMagnet) { return; }

    currentMagnet.classList.add('dropped');
    const id = currentMagnet.getAttribute('id');

    words[id].top = currentMagnet.style.top;
    words[id].left = currentMagnet.style.left;

    await update(words[id]);
    socket.emit('placed', words[id])

    setCurrentMagnet(null);
  }

  const placeWords = () => {
    const wordElements = Object.keys(words).map(id => addMagnet(words[id]));
    setMagnets(wordElements);
    setPositioned(true);
  }

  const addMagnet = (word) => {
    // positionMagnet(magnet);
    const id = word._id;
    return (
      <span
        key={id}
        id={id}
        className="magnet"
        onMouseDown={grabIt}
        style={{ top: word.top, left: word.left }}
      >
        {word.word}
      </span>
    )
  }

  const positionMagnet = (magnet) => {

    const id = magnet._id;

    const allMagnets = document.getElementsByClassName('magnet');
    const magnetElement = document.getElementById(id)

    // Has it already been positioned? If so, we leave it where it is
    if (magnet.top && magnet.left) { return; }

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

    update(magnet);
    console.log('randomly placed', magnet);

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

  // Set the dimensions
  // Fetch the words from the DB
  // drop the magnets on the board
  // This happens on page render and puts the magnets wherever the DB says they are
  useEffect(() => {

    socket.on('placed', itGotMoved);
    socket.on('moving', iAmMmoving);

    const fridge = document.getElementById('fridge');
    setFridgeTop(fridge.getBoundingClientRect().top + window.scrollY);
    setFridgeLeft(fridge.getBoundingClientRect().left + window.scrollX);
    setFridgeHeight(fridge.scrollHeight);
    setFridgeWidth(fridge.scrollWidth);

    // If the screen moves, we lose control of the mouse because the coordinates change...
    window.addEventListener('resize', () => {
      console.log('recalc');
      setFridgeTop(fridge.getBoundingClientRect().top + window.scrollY);
      setFridgeLeft(fridge.getBoundingClientRect().left + window.scrollX);
    });

    const getWords = async () => {
      const data = await read();
      setWords(data);
      setLoaded(true);
    }

    getWords();
    placeWords();

  }, [])

  // After we've got them loaded from the DB, position them
  // Can't be done in the [] useEffect becasue setWords() is technically async
  // Therefore, we end up in a race condition and need to make a separate listener
  // on the "loaded" flag. Ugly, but whatever
  useEffect(() => {
    loaded && placeWords()
  }, [loaded])

  // After the initial positioning (above), we now randomize any magnets without a position
  useEffect(() => {
    if (positioned) {
      // Words is a map, where the id is the DB ID, and the value is each word's object
      Object.keys(words).forEach(id => positionMagnet(words[id]));
    }
  }, [positioned])


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
