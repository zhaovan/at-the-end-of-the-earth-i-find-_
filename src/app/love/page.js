"use client";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { useSerial } from "@/context/SerialContext";
import { getHeartbeatData } from "@/helpers/transformHeartbeatData";
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

  const [randomNums, setRandomNums] = useState(words.map(() => Math.random()));

  const { output, startTime } = useSerial();

  const [heartRate, setHeartRate] = useState(0);
  const [sensorOn, setSensorOn] = useState(false);
  const processedRef = useRef([]); // <- hold latest value

  useEffect(() => {
    const interval = setInterval(() => {
      const prev = processedRef.current;
      const curr = output;

      const hasNewData =
        curr.length !== prev.length || curr.some((item, i) => item !== prev[i]);

      const lastBeat = curr[curr.length - 1];
      const bpm = parseInt(lastBeat.split(" ")[1]);

      if (hasNewData && bpm > 45 && bpm < 205) {
        processedRef.current = curr;

        setSensorOn(true);

        setHeartRate(bpm);
      } else {
        setHeartRate(0);
        setSensorOn(false);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [output, startTime]);

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
        setRandomNums(words.map(() => Math.random()));
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

  console.log("sensorOn", sensorOn);

  return (
    <div className={styles.container}>
      {gridWords.map((word, idx) => {
        const percentage = heartRate / 200;
        const shouldFlicker = randomNums[idx] < percentage;
        const randomDelayValue = randomNums[idx];

        return (
          <p
            key={idx}
            style={{
              "--animation-delay": `${randomDelayValue}s`,
            }}
            className={[
              styles.word,
              sensorOn && shouldFlicker ? styles.glitch : "",
            ].join(" ")}
            suppressHydrationWarning
            data-text={word}
          >
            {word}
          </p>
        );
      })}
    </div>
  );
}
