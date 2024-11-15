"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [opened, setOpened] = useState(false);

  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    const audio = new Audio("/bg.mp3");
    audio.volume = 0.15;
    audio.loop = true;
    document.addEventListener("mousemove", () => {
      audio.play();
    });

    setWindowSize(window.innerWidth);
  }, []);

  return (
    <main className={styles.main}>
      {opened ? (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={"/image.png"}
              width={600}
              height={450}
              priority
              className={styles.image1}
              alt="family photo"
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
      ) : (
        <button onClick={() => setOpened(true)} className={styles.enterButton}>
          look for {"{}"}
        </button>
      )}
    </main>
  );
}
