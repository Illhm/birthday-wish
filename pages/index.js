import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ConfettiGenerator from "confetti-js";
import Carousel from "../components/Carousel";
import LockScreen from "../components/LockScreen";

const imageFilenames = [
  "IMG-20260305-WA0024.jpg",
  "IMG-20260306-WA0008.jpg",
  "IMG-20260310-WA0034.jpg",
  "IMG-20260310-WA0036.jpg",
  "IMG-20260311-WA0004.jpg",
  "IMG-20260313-WA0007.jpg",
  "IMG-20260316-WA0008.jpg",
  "IMG-20260318-WA0008.jpg",
  "IMG-20260320-WA0010.jpg",
  "IMG-20260320-WA0030.jpg",
  "IMG-20260320-WA0032.jpg",
  "IMG-20260321-WA0034.jpg",
  "IMG-20260321-WA0036.jpg",
  "IMG-20260322-WA0002.jpg",
  "IMG-20260326-WA0001.jpg",
  "IMG-20260326-WA0002.jpg",
  "IMG-20260326-WA0003.jpg",
  "IMG-20260326-WA0004.jpg",
  "IMG-20260326-WA0005.jpg",
];

const carouselImages = imageFilenames.map((filename) => ({
  src: `/image/${filename}`,
  caption: "A beautiful memory ❤️",
}));

export default function Home({ forceUnlock = false }) {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (forceUnlock) {
      setIsLocked(false);
    } else {
      const today = new Date();
      const unlockDate = new Date("2026-03-27T00:00:00");
      if (today >= unlockDate) {
        setIsLocked(false);
      }
    }
  }, [forceUnlock]);

  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Only run confetti when not locked
    if (isLocked) return;

    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
      colors: [[255, 105, 180], [255, 192, 203], [255, 20, 147], [255, 0, 0]], // Romantic colors (Pinks and Reds)
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, [isLocked]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (isLocked) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Happy Birthday, My Love!</title>
          <meta name="description" content="A special birthday wish for you" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LockScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center font-serif text-pink-800 relative overflow-hidden">
      <Head>
        <title>Happy Birthday, My Love!</title>
        <meta name="description" content="A special birthday wish for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas className="fixed inset-0 pointer-events-none z-0" id="canvas"></canvas>

      <main className="z-10 w-full max-w-4xl px-4 py-12 flex flex-col items-center">
        {/* Simple & Elegant Greeting Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 md:p-16 text-center mb-16 border border-pink-100 max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-pink-600 drop-shadow-sm">
            Happy Birthday, My Love
          </h1>

          <div className="w-24 h-1 bg-pink-300 mx-auto mb-8 rounded-full"></div>

          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-light italic">
            <p>
              [ Your personal message goes here. Pour your heart out! ]
            </p>
            <p>
              [ Write about how much they mean to you, your favorite memories, and your hopes for their special day. ]
            </p>
            <p className="font-medium text-pink-500 mt-8">
              Forever Yours, <br/>
              [ Your Name ]
            </p>
          </div>

          <button
            className="mt-12 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-sans font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={toggleAudio}
          >
            {isPlaying ? "Pause Music ⏸️" : "Play Our Song 🎵"}
          </button>
        </div>

        {/* Dynamic Photo Gallery */}
        <div className="w-full relative">
          <h2 className="text-3xl font-serif text-center text-pink-600 mb-8 drop-shadow-sm">Our Beautiful Memories</h2>
          <Carousel images={carouselImages} />
        </div>
      </main>

      <audio ref={audioRef} loop>
        <source src="media/hbd.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
