import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ConfettiGenerator from "confetti-js";
import LockScreen from "../components/LockScreen";
import { useRouter } from 'next/router';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

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

// Helper to stagger words for reveal
const StaggeredText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-fadeUp"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const { forceUnlock } = router.query;
  const isForceUnlocked = forceUnlock === 'true';

  const [isLocked, setIsLocked] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [giftClicks, setGiftClicks] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    if (isForceUnlocked) {
      setIsLocked(false);
    } else {
      const today = new Date();
      // Production unlock date
      const unlockDate = new Date("2026-03-27T00:00:00");
      if (today >= unlockDate) {
        setIsLocked(false);
      }
    }
  }, [isForceUnlocked]);

  useEffect(() => {
    if (isLocked || !isAuthenticated) return;
    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
      colors: [[183, 110, 121], [253, 232, 232], [255, 245, 245], [253, 230, 138], [224, 242, 254]],
      clock: 12,
      max: 60, // less confetti, more elegant
      size: 1.5,
      props: ["circle"]
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Attempt autoplay when unlocked
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Auto-play failed (requires interaction):", e));
    }

    return () => confetti.clear();
  }, [isLocked, isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "NGOROK") {
      setIsAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne-light via-rosegold-light/30 to-blush-light font-sans p-4 relative overflow-hidden">
        {/* Ambient background for password screen */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-rosegold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-champagne-dark/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <Head>
          <title>Enter Password</title>
        </Head>
        <div className="glass-panel-heavy p-10 rounded-[32px] text-center max-w-sm w-full relative z-10 animate-fade-in-slow">
          <h1 className="text-3xl md:text-4xl text-rosegold-deep mb-8 font-serif tracking-wide drop-shadow-sm">Autentikasi</h1>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center w-full">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-rosegold/30 bg-white/50 backdrop-blur-sm rounded-2xl px-5 py-4 mb-8 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-rosegold/40 placeholder-gray-400 font-sans shadow-inner transition-all"
              placeholder="Masukkan password..."
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rosegold-dark to-rosegold text-white font-medium px-8 py-4 rounded-2xl hover:shadow-glow hover:scale-[1.02] transition-all duration-300 shadow-md tracking-wider uppercase text-sm"
            >
              Buka Kunci
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-vibrant-gradient text-white">
        <Head>
          <title>Selamat Ulang Tahun, Kasihku!</title>
        </Head>
        <LockScreen />
      </div>
    );
  }

  const handleGiftClick = () => {
    const newClicks = giftClicks + 1;
    setGiftClicks(newClicks);
    if (newClicks >= 3) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      // Start fireworks effect via confetti
      const confettiSettings = {
        target: "canvas",
        start_from_edge: true,
        colors: [[217, 70, 239], [147, 51, 234], [249, 115, 22], [255, 255, 255]],
        clock: 25,
        max: 150,
        size: 2,
        props: ["circle", "square", "triangle"]
      };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      setTimeout(() => {
        confetti.clear();
      }, 5000);

      setCurrentCard(1);
    }
  };

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setCurrentCard(1);
  };

  const nextCard = () => {
    if (currentCard < 5) setCurrentCard(prev => prev + 1);
  };

  const prevCard = () => {
    if (currentCard > 1) setCurrentCard(prev => prev - 1);
  };

  const handleShareStory = () => {
    const node = document.getElementById('story-summary');
    if (node) {
      toPng(node, { quality: 0.95 })
        .then(function (dataUrl) {
          saveAs(dataUrl, 'happy-birthday-story.png');
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-white overflow-hidden bg-vibrant-gradient">

      {/* Redesigned Ambient Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft glowing orbs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-magenta/30 rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-sunset/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/4 w-[40rem] h-[40rem] bg-purple/30 rounded-full mix-blend-screen filter blur-[120px] opacity-80 animate-blob animation-delay-4000"></div>

        {/* Decorative floating particles */}
         {[...Array(40)].map((_, i) => (
           <div
             key={i}
             className="particle-star"
             style={{
               width: `${Math.random() * 4 + 1}px`,
               height: `${Math.random() * 4 + 1}px`,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDuration: `${2 + Math.random() * 5}s`,
               animationDelay: `${Math.random() * 5}s`
             }}
           />
         ))}
      </div>

      <Head>
        <title>Selamat Ulang Tahun, Ansa!</title>
      </Head>
      <canvas className="fixed inset-0 pointer-events-none z-0 opacity-50" id="canvas"></canvas>

      <audio ref={audioRef} loop autoPlay>
        <source src="media/hbd.mp3" type="audio/mpeg" />
      </audio>

      <main className="z-10 w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center relative min-h-screen justify-center">

        {/* Render Card based on state */}
        <div className="relative w-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]">

          {/* Card 0: Cover (Virtual Gift Box) */}
          {currentCard === 0 && (
            <div className="p-12 md:p-16 rounded-[40px] text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
               <StaggeredText
                 text="Ada kejutan spesial untukmu..."
                 className="text-3xl md:text-5xl font-serif text-white mb-20 tracking-wide leading-[1.4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
               />

               <div className="flex flex-col items-center">
                 <p className="text-white/90 mb-8 font-sans animate-pulse tracking-wider">Tap kado ini 3 kali!</p>
                 <button
                   onClick={handleGiftClick}
                   className={`relative group transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${giftClicks > 0 ? 'animate-shake' : 'animate-gift-bounce'}`}
                   style={{ fontSize: `${5 + giftClicks}rem` }}
                 >
                   <span className="drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] filter">🎁</span>
                 </button>
                 <div className="mt-8 flex space-x-2">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-full transition-colors duration-300 ${i < giftClicks ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,1)]' : 'bg-white/30'}`} />
                   ))}
                 </div>
               </div>
            </div>
          )}

          {/* Card 1: The Hook */}
          {currentCard === 1 && (
            <div className="glass-panel-heavy bg-white/20 backdrop-blur-2xl p-10 md:p-20 rounded-[40px] text-center min-h-[600px] flex flex-col justify-center relative overflow-hidden border border-white/40">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-magenta/40 rounded-full blur-3xl pointer-events-none"></div>

              <h1 className="opacity-0 animate-fadeUp text-5xl md:text-7xl font-serif font-medium mb-8 text-white tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{ animationDelay: '100ms' }}>
                Selamat Ulang Tahun, <br /> <span className="font-cursive text-sunset font-normal text-6xl md:text-8xl mt-4 inline-block drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] pr-4">Ansa.</span>
              </h1>

              <div className="opacity-0 animate-fadeUp flex items-center justify-center space-x-4 my-10" style={{ animationDelay: '300ms' }}>
                 <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/80"></div>
                 <span className="text-white text-2xl animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</span>
                 <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/80"></div>
              </div>

              <div className="opacity-0 animate-fadeUp text-lg md:text-xl font-sans text-white/95 leading-[2.2] font-light max-w-xl mx-auto space-y-8 tracking-wide drop-shadow-sm" style={{ animationDelay: '500ms' }}>
                <p>
                  Hari ini adalah tentang kamu. Tentang cerewetmu yang selalu berhasil menghapus rasa sepiku, dan cara ngambekmu yang diam-diam selalu ngangenin.
                </p>
                <p>
                  Aku bikin ini buat ngerayain hari lahir kamu di dunia, dan yang paling penting, merayakan kehadiranmu yang sudah pelan-pelan ngubah hari-hariku jadi jauh lebih baik.
                </p>
              </div>
            </div>
          )}

          {/* Card 2: Visual Memory - Redesigned as Scrapbook */}
          {currentCard === 2 && (
            <div className="glass-panel-heavy bg-white/20 backdrop-blur-2xl border border-white/40 p-8 md:p-14 rounded-[40px] min-h-[650px] flex flex-col items-center overflow-hidden relative">
              <h2 className="opacity-0 animate-fadeUp text-3xl md:text-4xl font-serif text-white mb-12 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{ animationDelay: '100ms' }}>Koleksi Wajah Favoritku</h2>

              {/* Scrapbook Container */}
              <div className="opacity-0 animate-fadeUp w-full max-h-[60vh] overflow-y-auto overflow-x-hidden pr-2 pb-12 custom-scrollbar relative" style={{ animationDelay: '300ms' }}>

                {/* Masonry-style layout for scrapbook effect */}
                <div className="columns-2 md:columns-3 gap-6 space-y-6 pb-8 mx-auto px-2">
                  {imageFilenames.map((img, idx) => {
                    const rotations = ['rotate-[-4deg]', 'rotate-[3deg]', 'rotate-[-2deg]', 'rotate-[5deg]', 'rotate-0', 'rotate-[-6deg]', 'rotate-[4deg]'];
                    const rotation = rotations[idx % rotations.length];
                    const mt = idx % 2 !== 0 ? 'mt-8' : 'mt-0'; // Staggered vertical layout

                    return (
                      <div
                        key={idx}
                        className={`break-inside-avoid relative w-full rounded-sm bg-white p-3 md:p-4 pb-10 md:pb-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-4 hover:z-30 hover:shadow-[0_20px_40px_rgba(183,110,121,0.3)] transform ${rotation} ${mt}`}
                      >
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-md border border-white/60 rotate-[-2deg] shadow-sm z-20"></div>

                        <div className="relative aspect-[3/4] w-full overflow-hidden shadow-inner bg-gray-50">
                          <Image
                            src={`/image/${img}`}
                            alt="memory"
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>

              <p className="opacity-0 animate-fadeUp mt-6 text-lg text-white/95 italic text-center font-serif relative z-10 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]" style={{ animationDelay: '500ms' }}>
                &quot;Sekarang cuma bisa mandangin lewat layar hp, tapi sayangnya beneran nembus sampai ke hati.&quot;
              </p>
            </div>
          )}

          {/* Card 3: Appreciation */}
          {currentCard === 3 && (
            <div className="glass-panel-heavy bg-white/20 backdrop-blur-2xl border border-white/40 p-10 md:p-16 rounded-[40px] min-h-[600px] flex flex-col justify-center items-center relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="opacity-0 animate-fadeUp text-4xl font-serif text-white text-center mb-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{ animationDelay: '100ms' }}>Hal yang Aku Suka Dari Kamu</h2>

              <ul className="space-y-10 max-w-xl mx-auto w-full text-white/95 text-lg md:text-xl font-sans relative z-10 drop-shadow-sm">
                <li className="opacity-0 animate-fadeUp flex items-start space-x-6 group" style={{ animationDelay: '300ms' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/60 shadow-glass flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-xl">🌟</span>
                  </div>
                  <span className="font-light leading-[1.8] pt-1">caramu menemaniku ngobrol setiap hari, sampai rela ninggalin game cuma buat balas pesanku</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-6 group" style={{ animationDelay: '500ms' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/60 shadow-glass flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-xl">❤️</span>
                  </div>
                  <span className="font-light leading-[1.8] pt-1">keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-6 group" style={{ animationDelay: '700ms' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/60 shadow-glass flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-xl">🌟</span>
                  </div>
                  <span className="font-light leading-[1.8] pt-1">sifat cemburuan dan gengsimu yang diam-diam selalu berhasil bikin aku makin sayang</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-6 group" style={{ animationDelay: '900ms' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/60 shadow-glass flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-xl">❤️</span>
                  </div>
                  <span className="font-light leading-[1.8] pt-1">caramu menjaga perasaanku, yang bikin aku selalu yakin dan rela menunggu sampai kita bisa bertemu nanti</span>
                </li>
              </ul>
            </div>
          )}

          {/* Card 4: The Conclusion */}
          {currentCard === 4 && (
            <div className="glass-panel-heavy bg-white/20 backdrop-blur-2xl border border-white/40 p-10 md:p-20 rounded-[40px] min-h-[600px] flex flex-col justify-center relative overflow-hidden">
              <h2 className="opacity-0 animate-fadeUp text-3xl font-serif text-white mb-12 text-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{ animationDelay: '100ms' }}>Doaku Untukmu...</h2>

              <div className="opacity-0 animate-fadeUp text-lg md:text-xl font-sans text-white/95 leading-[2.2] font-light space-y-8 relative z-10 drop-shadow-sm" style={{ animationDelay: '300ms' }}>
                <p className="ml-4 md:ml-8 mr-2 md:mr-12 indent-8">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu. Makasih ya sudah sekuat ini dan pelan-pelan mau membuka hati lagi buat aku.
                </p>
                <p className="mr-4 md:mr-8 ml-2 md:ml-12 text-right">
                  Walaupun raga kita belum bisa saling bertatap secara langsung, aku harap doa dan afeksiku selalu sampai ke kamu. Jangan pernah merasa sendirian lagi ya, ada aku di sini yang siap mendengarkan semua ceritamu.
                </p>
                <p className="font-serif text-2xl text-sunset mt-16 text-center italic drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                  Selamat bertambah usia, sayang.
                </p>
              </div>

              <div className="opacity-0 animate-fadeUp mt-20 text-right mr-4 md:mr-12 relative z-10" style={{ animationDelay: '600ms' }}>
                <p className="font-sans text-base font-light text-white/70 mb-1">Selamanya sedia buat kamu,</p>
                <p className="font-cursive text-5xl md:text-6xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transform -rotate-2">Ilham</p>
              </div>
            </div>
          )}

          {/* Card 5: Story Summary */}
          {currentCard === 5 && (
            <div id="story-summary" className="bg-gradient-to-br from-magenta/40 via-purple/40 to-sunset/40 backdrop-blur-3xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[40px] p-8 min-h-[600px] flex flex-col justify-center items-center aspect-[9/16] max-h-[85vh] mx-auto overflow-hidden relative">
              <div className="absolute inset-0 z-0 opacity-20 bg-[url('/image/IMG-20260326-WA0005.jpg')] bg-cover bg-center mix-blend-screen filter blur-sm"></div>

              <div className="z-10 w-full flex flex-col items-center text-center space-y-6">
                <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md shadow-glass border border-white/40 w-full mb-4">
                   <h1 className="text-3xl font-serif text-white italic tracking-wider mb-2 drop-shadow-md">Happy Birthday</h1>
                   <h2 className="font-cursive text-5xl text-sunset drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">Ansa</h2>
                   <div className="w-16 h-[1px] bg-white/50 mx-auto mt-6"></div>
                </div>

                <div className="text-sm font-sans text-white/95 leading-[1.8] px-5 py-6 font-light bg-white/20 rounded-3xl backdrop-blur-md border border-white/40 shadow-sm w-full drop-shadow-sm">
                  <p className="italic mb-4">&quot;Keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku.&quot;</p>
                  <p>Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu.</p>
                  <p className="font-cursive text-3xl text-white mt-4 drop-shadow-md">- Ilham -</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4 w-full px-1">
                  {[imageFilenames[0], imageFilenames[4], imageFilenames[8]].map((img, idx) => {
                     const rotation = idx === 1 ? 'rotate-0 scale-110 z-10' : (idx === 0 ? '-rotate-3' : 'rotate-3');
                     return (
                       <div key={idx} className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border-[3px] border-white transform ${rotation}`}>
                         <Image src={`/image/${img}`} alt="memory" layout="fill" objectFit="cover" />
                       </div>
                     )
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Controls */}
        {currentCard > 0 && (
          <div className="w-full max-w-2xl flex justify-between items-center mt-12 px-2 animate-fadeUp relative z-20">
            <button
              onClick={prevCard}
              className={`flex items-center space-x-2 px-6 py-3.5 rounded-full border border-white/40 bg-white/20 backdrop-blur-md text-white font-sans tracking-wide text-sm font-medium shadow-glass hover:bg-white/30 hover:shadow-glass-hover hover:-translate-x-1 transition-all duration-300 ${currentCard === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'}`}
            >
              <span>←</span>
              <span className="hidden sm:inline">Kembali</span>
            </button>

            {currentCard < 5 ? (
              <button
                onClick={nextCard}
                className="flex items-center space-x-3 px-8 py-3.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white font-sans tracking-wide text-sm font-medium shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.4)] hover:bg-white/40 hover:translate-x-1 transition-all duration-300"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span>→</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleShareStory}
                  className="px-6 py-3.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 font-sans text-sm text-white font-medium shadow-glass hover:bg-white/40 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="text-lg">📸</span>
                  <span>Simpan sbg Story</span>
                </button>
                <div className="px-8 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner flex items-center space-x-3">
                  <span className="font-cursive text-2xl text-white pt-1 drop-shadow-md">I Love You</span>
                  <span className="animate-pulseGlow drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">❤️</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
