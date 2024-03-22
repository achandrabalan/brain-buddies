import React, { useEffect, useState, useMemo } from 'react';
import { canHaveDecorators } from 'typescript';

const Hero = () => {
  // Texts to cycle through
  const texts = useMemo(
    () => [
      'Climb the leaderboard',
      'Ruin friendships',
      'Assemble your crew',
      'Bragging rights await.',
      'Track your achievements',
      'Unseat the reigning champ',
      'Gloat.',
    ],
    []
  ); // Empty dependency array to prevent re-creation of the array
  // State to hold the current text and its index
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      // Start deleting after a longer pause
      setTimeout(() => setReverse(true), 2000); // Hold the full sentence longer
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex(
          (prevSubIndex) => prevSubIndex + (reverse ? -prevSubIndex : 1)
        );
      },
      reverse ? 75 : 100
    ); // Faster typing speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <div className="flex w-[65%] h-screen justify-start text-center items-center">
      <h1 className="w-full font-angkor text-5xl">
        {`${texts[index].substring(0, subIndex)}`}
        <span className="blink-animation">|</span>
      </h1>
    </div>
  );
};

export default Hero;
