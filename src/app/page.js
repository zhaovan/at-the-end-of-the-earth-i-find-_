"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const links = ["/quiet", "/love", "/taste"];
  useEffect(() => {
    const audio = new Audio("/bg.mp3");
    audio.volume = 0.15;
    audio.loop = true;
    document.addEventListener("mousemove", () => {
      audio.play();
    });
  }, []);

  return (
    <main className={styles.main}>
      <button
        className={styles.enterButton}
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * links.length);
          window.location.href = links[randomIndex];
        }}
      >
        look for {"{}"}
      </button>
    </main>
  );
}
