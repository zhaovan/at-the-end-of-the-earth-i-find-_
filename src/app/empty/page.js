"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

export default function Empty() {
  const [numSpace, setNumSpace] = useState(1);
  const numItems = 100;
  const topPos = useMemo(
    () => [...Array(numItems)].map(() => Math.random() * 95),
    []
  );
  const leftPos = useMemo(
    () => [...Array(numItems)].map(() => Math.random() * 100),
    []
  );

  const animationDelay = useMemo(
    () => [...Array(numItems)].map(() => Math.random() * 20),
    []
  );

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
      if (numSpace > 50) {
        setNumSpace(1);
      } else {
        setNumSpace(numSpace + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [numSpace]);

  return (
    <>
      <div className={styles.noiseLayer} />
      <div className={styles.container}>
        <h1 className={styles.empty}>{"{"}</h1>
        <h1 className={styles.empty2} style={{ animationDelay: "150ms" }}>
          {"}"}
        </h1>
        {[...Array(numItems)].map((_, idx) => {
          return (
            <div key={idx}>
              <p
                className={styles.emptyBracket}
                style={{
                  top: `${topPos[idx]}vh`,
                  left: `${leftPos[idx]}vw`,
                }}
              >
                {`[`}
              </p>
              <p
                className={styles.emptyBracket2}
                style={{
                  top: `${topPos[idx]}vh`,
                  left: `calc(${leftPos[idx]}vw + 10px)`,
                  animationDelay: `${animationDelay[idx]}s`,
                }}
              >
                {"]"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
