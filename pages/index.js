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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-peach-light via-rosegold-light to-amber-soft font-sans p-4 relative overflow-hidden">
        {/* Ambient Blobs */}
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-rosegold rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <Head>
          <title>Enter Password</title>
        </Head>
        <div className="relative z-10 bg-white/50 p-10 md:p-12 rounded-3xl shadow-[0_8px_32px_0_rgba(183,110,121,0.2)] text-center backdrop-blur-2xl border border-white/60 max-w-sm w-full transform transition-all hover:scale-[1.02]">
          <div className="mb-8 flex justify-center">
            <span className="text-4xl animate-pulseGlow drop-shadow-md">🔒</span>
          </div>
          <h1 className="text-3xl text-rosegold-dark mb-8 font-serif font-medium">Masukkan Password</h1>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center w-full">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-white/80 bg-white/60 rounded-2xl px-5 py-4 mb-8 text-center text-rosegold-dark text-lg focus:outline-none focus:ring-2 focus:ring-rosegold/50 focus:bg-white/80 placeholder-rosegold/50 transition-all shadow-inner"
              placeholder="Password..."
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rosegold to-rosegold-dark text-white font-serif italic text-xl px-6 py-4 rounded-full hover:shadow-[0_0_25px_rgba(183,110,121,0.6)] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_15px_rgba(183,110,121,0.4)]"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="min-h-screen">
        <Head>
          <title>Selamat Ulang Tahun, Kasihku!</title>
        </Head>
        <LockScreen />
      </div>
    );
  }

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
    <div className="min-h-screen relative font-sans text-rosegold-dark overflow-hidden bg-[length:400%_400%] animate-movingBg bg-gradient-to-tr from-peach-light via-rosegold-light to-amber-soft">

      {/* Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 -left-1/4 w-[50vw] h-[50vw] bg-rosegold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-amber-soft rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Decorative floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         {[...Array(20)].map((_, i) => (
           <div
             key={i}
             className={`absolute rounded-full blur-[1px] shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] animate-floatUp ${i % 3 === 0 ? 'bg-rosegold-light/60 w-3 h-3' : 'bg-white/60 w-2 h-2'}`}
             style={{
               left: `${Math.random() * 100}%`,
               animationDuration: `${12 + Math.random() * 20}s`,
               animationDelay: `${Math.random() * 10}s`
             }}
           />
         ))}
         {/* Floating Hearts */}
         {[...Array(5)].map((_, i) => (
           <div
             key={`heart-${i}`}
             className="absolute text-rosegold/30 animate-heartFloat text-xl"
             style={{
               left: `${10 + Math.random() * 80}%`,
               top: `${20 + Math.random() * 60}%`,
               animationDuration: `${6 + Math.random() * 4}s`,
               animationDelay: `${Math.random() * 5}s`
             }}
           >
             ❤️
           </div>
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

          {/* Card 0: Cover */}
          {currentCard === 0 && (
            <div className="bg-white/20 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(183,110,121,0.25)] rounded-[2rem] p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[500px] transform transition-all duration-700 animate-slideUpFade">
               <div className="mb-10 text-5xl animate-bounce">💌</div>
               <StaggeredText
                 text="Ada pesan puitis yang menunggu untukmu..."
                 className="text-3xl md:text-5xl font-serif text-rosegold-dark mb-16 tracking-wide leading-relaxed font-medium drop-shadow-sm"
               />
               <button
                 onClick={handleStart}
                 className="opacity-0 animate-fadeUp relative overflow-hidden group px-12 py-5 rounded-full border border-rosegold/50 bg-white/50 text-rosegold-dark font-serif italic text-2xl shadow-[0_4px_20px_0_rgba(183,110,121,0.3)] hover:bg-gradient-to-r hover:from-rosegold hover:to-rosegold-dark hover:text-white hover:border-transparent hover:scale-105 transition-all duration-500 flex items-center space-x-4"
                 style={{ animationDelay: '1200ms' }}
               >
                 <span className="relative z-10">Buka Surat</span>
                 {/* Shimmer effect */}
                 <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer z-0"></div>
               </button>
            </div>
          )}

          {/* Card 1: The Hook */}
          {currentCard === 1 && (
            <div className="bg-white/20 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(183,110,121,0.25)] rounded-[2rem] p-12 md:p-20 text-center min-h-[550px] flex flex-col justify-center animate-slideUpFade">
              <h1 className="text-5xl md:text-7xl font-serif font-semibold mb-8 text-rosegold-dark tracking-wide leading-tight drop-shadow-md">
                Selamat Ulang Tahun, <br /> <span className="text-rosegold italic mt-4 inline-block font-light">Ansa.</span>
              </h1>
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rosegold to-transparent mx-auto mb-12"></div>
              <div className="text-xl md:text-2xl font-sans text-gray-800 leading-[2] font-light max-w-2xl mx-auto space-y-8 bg-white/30 p-8 rounded-2xl shadow-inner border border-white/50">
                <p>
                  Hari ini adalah tentang kamu. Tentang cerewetmu yang selalu berhasil menghapus rasa sepiku, dan cara ngambekmu yang diam-diam selalu ngangenin.
                </p>
                <p>
                  Aku bikin ini buat ngerayain hari lahir kamu di dunia, dan yang paling penting, merayakan kehadiranmu yang sudah pelan-pelan ngubah hari-hariku jadi jauh lebih baik.
                </p>
              </div>
            </div>
          )}

          {/* Card 2: Visual Memory */}
          {currentCard === 2 && (
            <div className="bg-white/20 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(183,110,121,0.25)] rounded-[2rem] p-10 md:p-16 min-h-[600px] flex flex-col items-center animate-slideUpFade relative overflow-hidden">
              <h2 className="text-4xl md:text-5xl font-serif text-rosegold-dark mb-12 text-center italic drop-shadow-sm font-medium relative z-10">Koleksi Wajah Favoritku</h2>

              {/* Romantic Scrapbook Layout */}
              <div className="relative w-full h-[400px] md:h-[450px] z-10 flex justify-center items-center">
                {imageFilenames.slice(0, 7).map((img, idx) => {
                  const zIndex = idx;
                  const isCenter = idx === 3;
                  const rotation = isCenter ? 0 : (idx % 2 === 0 ? 10 + idx * 2 : -10 - idx * 2);
                  const xOffset = isCenter ? 0 : (idx % 2 === 0 ? 60 + idx * 10 : -60 - idx * 10);
                  const scale = isCenter ? 1.1 : 0.9 - (idx * 0.05);

                  return (
                    <div
                      key={idx}
                      className="absolute aspect-[3/4] w-40 md:w-56 rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.2)] p-3 bg-white border border-gray-100 group transition-all duration-700 hover:z-50 hover:scale-[1.2] hover:rotate-0 hover:shadow-[0_20px_40px_rgba(183,110,121,0.4)] cursor-pointer"
                      style={{
                        zIndex: isCenter ? 40 : zIndex,
                        transform: `translateX(${xOffset}px) rotate(${rotation}deg) scale(${scale})`,
                        transformOrigin: 'center center'
                      }}
                    >
                      <div className="relative w-full h-full rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] overflow-hidden">
                        <Image
                          src={`/image/${img}`}
                          alt="memory"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {/* Polaroid Tape Effect */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 backdrop-blur-sm shadow-sm rotate-[-2deg] opacity-70"></div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 bg-white/40 px-8 py-4 rounded-full border border-white/60 backdrop-blur-sm z-10">
                <p className="text-lg text-gray-700 italic text-center font-serif">&quot;Sekarang cuma bisa mandangin lewat layar hp, tapi sayangnya beneran nembus sampai ke hati.&quot;</p>
              </div>
            </div>
          )}

          {/* Card 3: Appreciation */}
          {currentCard === 3 && (
            <div className="bg-white/20 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(183,110,121,0.25)] rounded-[2rem] p-12 md:p-16 min-h-[550px] flex flex-col justify-center items-center animate-slideUpFade">
              <h2 className="text-4xl md:text-5xl font-serif text-rosegold-dark text-center mb-16 font-medium drop-shadow-sm">Hal yang Aku Suka Dari Kamu</h2>

              <ul className="space-y-6 max-w-2xl mx-auto w-full text-gray-800 text-lg md:text-xl font-sans">
                {[
                  { icon: "🌟", text: "caramu menemaniku ngobrol setiap hari, sampai rela ninggalin game cuma buat balas pesanku" },
                  { icon: "❤️", text: "keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku" },
                  { icon: "✨", text: "sifat cemburuan dan gengsimu yang diam-diam selalu berhasil bikin aku makin sayang" },
                  { icon: "💖", text: "caramu menjaga perasaanku, yang bikin aku selalu yakin dan rela menunggu sampai kita bisa bertemu nanti" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-6 bg-white/40 p-6 rounded-2xl shadow-sm border border-white/60 hover:bg-white/60 hover:scale-[1.02] hover:shadow-md transition-all duration-300">
                    <span className="text-3xl mt-1 animate-pulseGlow">{item.icon}</span>
                    <span className="font-light leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Card 4: The Conclusion */}
          {currentCard === 4 && (
            <div className="bg-white/20 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(183,110,121,0.25)] rounded-[2rem] p-14 md:p-24 min-h-[550px] flex flex-col justify-center animate-slideUpFade relative">
              {/* Wax Seal Decorative */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-rosegold to-red-700 rounded-full shadow-[0_5px_15px_rgba(183,110,121,0.6)] flex items-center justify-center opacity-80 transform rotate-12">
                 <span className="text-white font-serif text-2xl italic">I</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-rosegold-dark mb-12 text-left font-medium">Doaku Untukmu...</h2>

              <div className="text-xl md:text-2xl font-sans text-gray-800 leading-[2.2] font-light space-y-10 bg-white/30 p-10 rounded-3xl border border-white/50 shadow-inner">
                <p className="ml-4 md:ml-8">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu. Makasih ya sudah sekuat ini dan pelan-pelan mau membuka hati lagi buat aku.
                </p>
                <p className="mr-4 md:mr-8 text-right border-r-4 border-rosegold/40 pr-6">
                  Walaupun raga kita belum bisa saling bertatap secara langsung, aku harap doa dan afeksiku selalu sampai ke kamu. Jangan pernah merasa sendirian lagi ya, ada aku di sini yang siap mendengarkan semua ceritamu.
                </p>
                <p className="font-serif text-3xl md:text-4xl text-rosegold-dark mt-16 text-center italic drop-shadow-md">
                  Selamat bertambah usia, sayang.
                </p>
              </div>

              <div className="mt-20 text-right mr-8">
                <p className="font-sans text-lg font-light text-gray-600 mb-2">Selamanya sedia buat kamu,</p>
                <p className="font-serif text-5xl text-rosegold-dark drop-shadow-sm font-semibold">Ilham</p>
              </div>
            </div>
          )}

          {/* Card 5: Story Summary */}
          {currentCard === 5 && (
            <div id="story-summary" className="bg-white/30 backdrop-blur-3xl border border-white/60 shadow-[0_15px_50px_rgba(183,110,121,0.3)] rounded-[2.5rem] p-10 flex flex-col justify-center items-center aspect-[9/16] w-full max-w-[400px] mx-auto overflow-hidden relative animate-slideUpFade">
              <div className="absolute inset-0 z-0 opacity-30 bg-[url('/image/IMG-20260326-WA0005.jpg')] bg-cover bg-center mix-blend-overlay filter blur-[2px]"></div>

              <div className="z-10 w-full flex flex-col items-center text-center space-y-8">
                <div className="bg-white/50 px-8 py-4 rounded-2xl backdrop-blur-md border border-white/70 shadow-sm w-full">
                  <h1 className="text-4xl font-serif text-rosegold-dark italic tracking-wider mb-2">Happy Birthday</h1>
                  <h2 className="text-4xl font-serif text-rosegold font-bold tracking-widest uppercase">Ansa</h2>
                </div>

                <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-rosegold-dark to-transparent mx-auto"></div>

                <div className="text-base font-sans text-gray-800 leading-relaxed px-6 py-6 space-y-4 font-light bg-white/60 rounded-2xl backdrop-blur-md border border-white/70 shadow-inner w-full relative">
                  <span className="absolute -top-4 -left-2 text-4xl text-rosegold/40 font-serif">&quot;</span>
                  <p className="italic relative z-10">Keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku.</p>
                  <p className="relative z-10">Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu.</p>
                  <p className="font-medium text-rosegold-dark mt-4 text-right">- Ilham -</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 w-full px-2">
                  {[imageFilenames[0], imageFilenames[4], imageFilenames[8]].map((img, idx) => (
                     <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border-2 border-white/80 hover:scale-105 transition-transform">
                       <Image src={`/image/${img}`} alt="memory" layout="fill" objectFit="cover" />
                     </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Controls */}
        {currentCard > 0 && (
          <div className="w-full max-w-3xl flex justify-between items-center mt-12 px-4 animate-slideUpFade" style={{ animationDelay: '500ms' }}>
            <button
              onClick={prevCard}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full border border-white/60 bg-white/30 backdrop-blur-xl text-rosegold-dark font-serif italic text-lg shadow-[0_4px_15px_rgba(183,110,121,0.1)] hover:bg-white/60 hover:shadow-[0_0_20px_rgba(183,110,121,0.3)] hover:-translate-x-1 transition-all duration-300 ${currentCard === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'}`}
            >
              <span>←</span>
              <span className="hidden sm:inline">Putar Kembali</span>
            </button>

            {currentCard < 5 ? (
              <button
                onClick={nextCard}
                className="flex items-center space-x-3 px-10 py-4 rounded-full bg-gradient-to-r from-rosegold to-rosegold-dark text-white font-serif italic text-lg shadow-[0_8px_25px_rgba(183,110,121,0.5)] hover:shadow-[0_0_30px_rgba(183,110,121,0.8)] hover:translate-x-1 hover:scale-105 transition-all duration-300 group"
              >
                <span className="hidden sm:inline group-hover:tracking-wider transition-all">Lanjut</span>
                <span className="group-hover:animate-pulse">→</span>
              </button>
            ) : (
              <div className="flex flex-wrap justify-end gap-4">
                <button
                  onClick={handleShareStory}
                  className="px-8 py-4 rounded-full bg-white/50 backdrop-blur-xl border border-white/80 font-sans text-base text-rosegold-dark font-medium shadow-[0_4px_15px_rgba(183,110,121,0.2)] hover:bg-white/80 hover:scale-105 hover:shadow-[0_0_20px_rgba(183,110,121,0.4)] transition-all duration-300 flex items-center space-x-3"
                >
                  <span className="text-xl">📷</span>
                  <span>Simpan sbg Story</span>
                </button>
                <div className="px-10 py-4 rounded-full bg-gradient-to-r from-rosegold to-rosegold-dark text-white font-serif text-xl italic font-medium shadow-[0_8px_25px_rgba(183,110,121,0.5)] flex items-center space-x-3">
                  <span>I Love You</span>
                  <span className="animate-heartFloat inline-block">❤️</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
