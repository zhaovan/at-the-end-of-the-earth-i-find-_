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
      {links.map((link) => {
        const randDuration = Math.floor(Math.random() * 6) + 1;
        return (
          <button
            className={styles.enterButton}
            key={link}
            style={{ animationDuration: `${randDuration}s` }}
            onClick={() => {
              window.open(
                link,
                "_blank",
                "width=1600,height=1200,noopener,noreferrer"
              );
            }}
          >
            look for {link.slice(1)}
          </button>
        );
      })}
    </main>
  );
}
