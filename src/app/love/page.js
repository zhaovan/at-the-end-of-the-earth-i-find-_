"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
const words = [
  "fuck",
  "slap",
  "kiss",
  "marry",
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
  "down",
  "serve",
  "lust",
  "bond",
  "toxicate",
  "verify",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

export default function Love() {
  const [gridWords, setGridWords] = useState(words);

  // function fisherYatesShuffle(arr) {
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   return arr;
  // }

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
        return;
      }

      const foundWordIdx = gridWords.findIndex((word) => word !== selectedWord);
      gridWords[foundWordIdx] = selectedWord;
      setGridWords([...gridWords]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gridWords]);

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
