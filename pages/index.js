import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ConfettiGenerator from "confetti-js";

export default function Home() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
      colors: [[255, 105, 180], [255, 192, 203], [255, 20, 147], [255, 0, 0]], // Romantic colors (Pinks and Reds)
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Happy Birthday, My Love!</title>
        <meta name="description" content="A special birthday wish for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas className={styles.canvas} id="canvas"></canvas>

      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Happy Birthday, <span className={styles.highlight}>Sayang! ❤️</span>
          </h1>

          <div className={styles.photoContainer}>
            {/* Replace the src below with your own photo */}
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23ffb6c1%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2285%22%20y%3D%22155%22%3EYour%20Photo%20Here%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt="Our lovely memory"
              className={styles.photo}
            />
          </div>

          <div className={styles.messageContainer}>
            <p className={styles.message}>
              Selamat ulang tahun untuk orang yang paling spesial di hidupku! 🎉
            </p>
            <p className={styles.message}>
              Terima kasih sudah menjadi alasan di balik senyumku setiap hari.
              Semoga di hari ulang tahunmu ini, semua harapan dan mimpimu bisa terwujud.
              Aku bersyukur banget bisa merayakan hari bahagiamu bersamamu.
            </p>
            <p className={styles.message}>
              I love you more than words can say. Have the most wonderful birthday! 🥰
            </p>
          </div>

          <button className={styles.playButton} onClick={toggleAudio}>
            {isPlaying ? "Pause Music ⏸️" : "Play Our Song 🎵"}
          </button>
        </div>
      </main>

      <audio ref={audioRef} loop>
        <source src="media/hbd.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
