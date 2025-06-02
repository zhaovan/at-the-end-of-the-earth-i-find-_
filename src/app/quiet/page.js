"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import styles from "./page.module.css";
import { useSerial } from "@/context/SerialContext";
import { getHeartbeatData } from "@/helpers/transformHeartbeatData";

export default function Empty() {
  const [numSpace, setNumSpace] = useState(1);
  const numItems = 100;

  const lastFiveSensorOns = useRef([]);
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

  const heartbeatAudioRef = useRef(null);
  const { output, startTime } = useSerial();
  const [sensorOn, setSensorOn] = useState(false);
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const { sensorOn, heartRate } = getHeartbeatData(output, startTime);
      setSensorOn(sensorOn);
      setHeartRate(heartRate);
    }, 500);

    return () => clearInterval(interval);
  }, [output, startTime]);

  // Initialize and persist the heartbeat audio
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
      heartbeat.play().catch((err) => {
        console.error("Failed to play heartbeat:", err);
      });
    } else {
      heartbeat.pause();
      heartbeat.currentTime = 0; // Reset for next play
    }
  }, [sensorOn]);

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
        <h1
          className={styles.empty}
          style={{
            animationDuration: sensorOn ? `${heartRate}s` : "5s",
          }}
        >
          {"{"}
        </h1>
        <h1
          className={styles.empty2}
          style={{
            animationDelay: "150ms",
            animationDuration: sensorOn ? `${heartRate}s` : "5s",
          }}
        >
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
                  animationSpeed: `${animationDelay[idx] * 1.1}s`,
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
