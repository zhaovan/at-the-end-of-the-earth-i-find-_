"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useSerial } from "@/context/SerialContext";
import { getHeartbeatData } from "@/helpers/transformHeartbeatData";

export default function Pain() {
  const [windowSize, setWindowSize] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const audio = new Audio("/bg.mp3");
    audio.volume = 0.15;
    audio.loop = true;
    document.addEventListener("mousemove", () => {
      audio.play();
    });

    setWindowSize(window.innerWidth);
  }, []);

  // Should take 63 seconds EXACTLY, but we set some buffer time
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleKey((prev) => prev + 1);
    }, 75000); // 75 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  // 19 Lines
  const text = `in wake of waxing crescent grand // mother asks if i have a
    girlfriend // i respond with an assemblage of stones in my throat //
    masquerading as language // the dirty ground has never reflected
    the moon // i peel a tomato between my thumb and fore // finger and suck
    the juice between my tongues // seed after seed in my lungs //
    we bask in fried fish scheming alliums // the fish eye drowns me in
    its knowingness // my brother parades his compulsive heterosexuality // he
    feigns cultural understanding // rewarded with red envelopes // when i
    bring {} // i am rewarded with malfeasance & gravestones // oh
    how i would love to lick the salt off those envelopes // to taste
    fingerdust and flaky skin // to bring him around with no questions //
    to tell them how i've kissed the sky`;

  const heartbeatAudioRef = useRef(null);
  const { output, startTime } = useSerial();
  const { sensorOn, heartRateDuration } = getHeartbeatData(output, startTime);

  useEffect(() => {
    heartbeatAudioRef.current = new Audio("/heartbeat.mp3");
    heartbeatAudioRef.current.loop = true;
    heartbeatAudioRef.current.volume = 0.5; // Adjust as needed

    return () => {
      heartbeatAudioRef.current?.pause();
      heartbeatAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const heartbeat = heartbeatAudioRef.current;
    if (!heartbeat) return;

    if (sensorOn) {
      heartbeatAudioRef.current.playbackRate = heartRateDuration / 3;
      heartbeat.play().catch((err) => {
        console.error("Failed to play heartbeat:", err);
      });
    } else {
      heartbeat.pause();
      heartbeat.currentTime = 0; // Reset for next play
    }
  }, [sensorOn]);

  return (
    <div className={styles.main}>
      <div className={styles.container} key={cycleKey}>
        <div className={styles.imageContainer}>
          <Image
            src={"/image.png"}
            width={600}
            height={450}
            priority
            className={styles.image1}
            alt="family photo"
            style={{
              animationDuration: sensorOn ? `${heartRateDuration}s` : "2.25s",
            }}
          />
          <Image
            src={"/image3.jpeg"}
            width={600}
            height={450}
            className={styles.image2}
            alt="family photo"
          />
        </div>
        <p>
          {text.split("//").map((line, idx) => {
            const animationDelayValue = (idx + 1) * 3;
            const top = (idx + 1) * 5;
            const left =
              windowSize > 700 ? Math.random() * 75 : Math.random() * 50;
            return (
              <span
                className={styles.fadingText}
                key={idx}
                style={{
                  animationDelay: `${animationDelayValue}s`,
                  top: `${top}vh`,
                  left: `${left}vw`,
                }}
              >
                {line}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
