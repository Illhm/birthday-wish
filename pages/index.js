import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ConfettiGenerator from "confetti-js";
import Carousel from "../components/Carousel";
import LockScreen from "../components/LockScreen";
import { useIntersection } from "react-use";

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

  const galleryRef = useRef(null);
  const galleryIntersection = useIntersection(galleryRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#f4dada] flex flex-col items-center justify-center font-serif text-pink-800 relative overflow-hidden">
      <Head>
        <title>Happy Birthday, My Love!</title>
        <meta name="description" content="A special birthday wish for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas className="fixed inset-0 pointer-events-none z-0" id="canvas"></canvas>

      <main className="z-10 w-full max-w-4xl px-4 py-12 flex flex-col items-center">
        {/* Simple & Elegant Greeting Section */}
        <div className="relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_0_rgba(227,168,177,0.37)] rounded-3xl p-8 md:p-16 text-center mb-16 max-w-2xl w-full">
          {/* Subtle Background Texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b76e79' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

          <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-6 text-[#b76e79] drop-shadow-sm">
            Happy Birthday, My Love
          </h1>

          <div className="relative z-10 w-24 h-1 bg-pink-300 mx-auto mb-8 rounded-full"></div>

          <div className="relative z-10 space-y-6 text-lg md:text-xl font-sans text-gray-800 leading-relaxed font-light italic">
            <p>
              [ Your personal message goes here. Pour your heart out! ]
            </p>
            <p>
              [ Write about how much they mean to you, your favorite memories, and your hopes for their special day. ]
            </p>
            <p className="font-medium text-[#b76e79] mt-8">
              Forever Yours, <br/>
              [ Your Name ]
            </p>
          </div>

          <button
            className="relative z-10 mt-12 text-[#b76e79] hover:text-[#a05a66] hover:drop-shadow-[0_0_8px_rgba(183,110,121,0.5)] transition-all duration-300 tracking-wider uppercase text-sm font-medium"
            onClick={toggleAudio}
          >
            {isPlaying ? "Pause Music ⏸️" : "Celebrate with Nadin Amizah 🎵"}
          </button>
        </div>

        {/* Dynamic Photo Gallery */}
        <div
          ref={galleryRef}
          className={`w-full relative transition-all duration-1000 ease-out transform ${
            galleryIntersection && galleryIntersection.intersectionRatio > 0.1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-3xl font-serif text-center text-[#b76e79] mb-8 drop-shadow-sm">Our Beautiful Memories</h2>
          <Carousel images={carouselImages} />
        </div>
      </main>

      <audio ref={audioRef} loop>
        <source src="media/hbd.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
