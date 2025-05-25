"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
const words = [
  "fuck",
  "slap",
  "kiss",
  "taste",
  "want",
  "desire",
  "eat",
  "crave",
  "name",
  "grab",
  "hold",
  "sick",
  "down",
  "whisper",
  "die",
  "lick",
  "bite",
  "love",
  "marry",
  "serve",
  "lust",
  "bond",
  "touch",
  "kneel",
];

const Direction = {
  FORWARDS: "forwards",
  BACKWARDS: "backwards",
};
let selectedWord = words[Math.floor(Math.random() * words.length)];

export default function Love() {
  const [gridWords, setGridWords] = useState(words);

  const [direction, setDirection] = useState(Direction.BACKWARDS);

  useEffect(() => {
    const audio = new Audio("/bg.mp3");
    audio.volume = 0.15;
    audio.loop = true;
    document.addEventListener("mousemove", () => {
      audio.play();
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Think about what the pattern could look like for word changing

      if (gridWords.every((word) => word === selectedWord)) {
        setGridWords([...words]);
        selectedWord = words[Math.floor(Math.random() * words.length)];
        setDirection(
          Math.random() > 0.5 ? Direction.FORWARDS : Direction.BACKWARDS
        );
        return;
      }

      let foundWordIdx;
      if (direction === Direction.FORWARDS) {
        foundWordIdx = gridWords.findIndex((word) => word !== selectedWord);
      } else {
        foundWordIdx = gridWords.findLastIndex((word) => word !== selectedWord);
      }

      gridWords[foundWordIdx] = selectedWord;
      setGridWords([...gridWords]);
    }, 750);
    return () => clearInterval(intervalId);
  }, [gridWords, direction]);

  return (
    <div className={styles.container}>
      {gridWords.map((word, idx) => {
        return (
          <p key={idx} className={styles.word} suppressHydrationWarning>
            {word}
          </p>
        );
      })}
    </div>
  );
}
