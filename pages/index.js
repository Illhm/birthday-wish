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
      colors: [[183, 110, 121], [253, 232, 232], [255, 245, 245]], // Rosegold, light blush, cream
      clock: 15,
      max: 150,
      size: 1.2,
      props: ["circle", "square"]
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
          <title>Selamat Ulang Tahun, Kasihku!</title>
          <meta name="description" content="A special birthday wish for you" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LockScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light to-rosegold-light flex flex-col items-center justify-center font-sans text-rosegold-dark relative overflow-hidden">
      <Head>
        <title>Selamat Ulang Tahun, Kasihku!</title>
        <meta name="description" content="A special birthday wish for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas className="fixed inset-0 pointer-events-none z-0" id="canvas"></canvas>

      <main className="z-10 w-full max-w-4xl px-4 py-12 flex flex-col items-center">
        {/* Simple & Elegant Greeting Section */}
        <div className="relative overflow-hidden bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(227,168,177,0.4)] rounded-3xl p-8 md:p-16 text-center mb-16 max-w-2xl w-full animate-fadeUp">
          {/* Subtle Background Texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b76e79' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

          <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 text-rosegold tracking-wide drop-shadow-sm leading-tight">
            Selamat Ulang Tahun, <br className="md:hidden" /> Kasihku
          </h1>

          <div className="relative z-10 w-24 h-px bg-rosegold/50 mx-auto mb-8"></div>

          <div className="relative z-10 flex flex-col items-center space-y-8 text-lg md:text-xl font-sans text-gray-700 leading-relaxed font-light">
            <p className="font-serif italic text-2xl text-rosegold-dark opacity-90">
              &quot;Di setiap detik yang berlalu, ada cinta yang terus tumbuh untukmu.&quot;
            </p>

            <div className="flex items-center space-x-2 text-rosegold/60 text-sm">
              <span>•</span>
              <span className="text-lg">✨</span>
              <span>•</span>
            </div>

            <p className="max-w-xl text-center">
              Mengingat kembali hari pertama kita bertemu, rasanya waktu berjalan begitu cepat. Setiap memori yang kita buat bersama menjadi harta paling berharga dalam hidupku.
            </p>

            <p className="max-w-xl text-center">
              Di hari istimewamu ini, aku berharap kamu selalu dilimpahi kebahagiaan, kesehatan, dan senyuman yang tak pernah pudar. Semoga semua impianmu menjadi kenyataan, dan aku bisa selalu ada di sisimu.
            </p>

            <div className="mt-8">
              <p className="font-serif text-2xl font-medium text-rosegold-dark">
                Selamanya milikmu,
              </p>
              <p className="font-serif text-2xl text-rosegold mt-2">
                [ Namamu ]
              </p>
            </div>
          </div>

          <button
            className="relative z-10 mt-14 flex items-center justify-center space-x-3 mx-auto px-6 py-3 rounded-full border border-rosegold/30 bg-white/50 text-rosegold-dark hover:bg-rosegold-light/50 hover:border-rosegold/50 hover:animate-pulseGlow transition-all duration-500 tracking-wide uppercase text-sm font-medium shadow-sm hover:shadow-md"
            onClick={toggleAudio}
          >
            {isPlaying ? (
              <>
                <span className="animate-pulse">Pause Music ⏸️</span>
              </>
            ) : (
              <>
                <span>Celebrate with Nadin&apos;s Voice</span>
                <span className="text-lg">🎵</span>
              </>
            )}
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
