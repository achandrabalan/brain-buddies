import React, { useEffect, useState } from 'react';

const TypingAnimation = () => {
  // Texts to cycle through
  const texts = [
    'Climb the leaderboard',
    'Ruin friendships',
    'Bragging rights await. ',
    'Track your acheivements',
    'Unseat the reigning champ',
    'Gloat. ',
  ];
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
  }, [subIndex, index, reverse]);

  return (
    <div className="flex w-full h-[25vh] justify-center text-center items-end pb-[5vh]">
      <h1 className="w-full font-angkor text-5xl">
        {`${texts[index].substring(0, subIndex)}`}
        <span>|</span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
