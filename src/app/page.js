"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const text = `in the wake of waxing crescent grand // mother asks me if i have a
girlfriend // i respond with an assemblage of stones in my throat //
masquerading as language // i stare at the dirty ground which has never reflected
the moon // i peel a tomato between my thumb and fore // finger and suck
the juice between my tongues // seed after seed stick in my lungs as
we bask in fried fish and scheming alliums // the fish eye drowns me in
it's knowingness // my brother parades his compulsive heterosexuality // he
feigns cultural understanding and is rewarded with red envelopes // when i
bring {} i am rewarded with malfeasance and gravestones // oh
how i would love to lick the salt off those envelopes // to taste
fingerdust and flaky skin // to bring him around with no questions //
to tell them how i've kissed the sky`;

export default function Home() {
  const [opened, setOpened] = useState(false);
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
      {opened ? (
        <>
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
              const animationDelayValue = idx * 3;
              const top = (idx + 1) * 5;
              const left = Math.random() * 75;
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
        </>
      ) : (
        <button onClick={() => setOpened(true)}>enter...</button>
      )}
    </main>
  );
}
