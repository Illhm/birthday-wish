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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cream-light via-rosegold-light to-amber-100 font-sans p-4">
        <Head>
          <title>Enter Password</title>
        </Head>
        <div className="bg-white/40 p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] text-center backdrop-blur-2xl border border-white/30 max-w-sm w-full">
          <h1 className="text-3xl text-rosegold-dark mb-6 font-serif">Masukkan Password</h1>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center w-full">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-rosegold/40 bg-white/60 rounded-xl px-4 py-3 mb-6 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-rosegold/50 placeholder-gray-400"
              placeholder="Password..."
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rosegold to-rosegold-dark text-white font-medium px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(183,110,121,0.6)] hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(183,110,121,0.4)]"
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
    <div className="min-h-screen relative font-sans text-rosegold-dark overflow-hidden bg-[length:400%_400%] animate-movingBg bg-gradient-to-tr from-cream-light via-rosegold-light to-amber-100">

      {/* Decorative floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         {[...Array(15)].map((_, i) => (
           <div
             key={i}
             className="absolute w-2 h-2 rounded-full bg-white/40 blur-sm shadow-[0_0_8px_4px_rgba(255,255,255,0.3)] animate-floatUp"
             style={{
               left: `${Math.random() * 100}%`,
               animationDuration: `${10 + Math.random() * 15}s`,
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

          {/* Card 0: Cover */}
          {currentCard === 0 && (
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
               <StaggeredText
                 text="Ada pesan puitis yang menunggu untukmu..."
                 className="text-3xl md:text-4xl font-serif text-rosegold-dark mb-16 tracking-wide leading-relaxed"
               />
               <button
                 onClick={handleStart}
                 className="opacity-0 animate-fadeUp px-10 py-4 rounded-full border border-rosegold/40 bg-white/40 text-rosegold-dark font-medium text-lg shadow-[0_4px_20px_0_rgba(183,110,121,0.2)] hover:bg-rosegold hover:text-white hover:border-rosegold transition-all duration-500 flex items-center space-x-4"
                 style={{ animationDelay: '1200ms' }}
               >
                 <span>Buka Surat</span>
                 <span className="text-2xl drop-shadow-sm">💌</span>
               </button>
            </div>
          )}

          {/* Card 1: The Hook */}
          {currentCard === 1 && (
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-10 md:p-16 text-center min-h-[550px] flex flex-col justify-center">
              <h1 className="opacity-0 animate-fadeUp text-5xl md:text-7xl font-serif font-medium mb-10 text-rosegold-dark tracking-wide leading-tight" style={{ animationDelay: '100ms' }}>
                Selamat Ulang Tahun, <br /> <span className="text-rosegold italic mt-2 inline-block">Ansa.</span>
              </h1>
              <div className="opacity-0 animate-fadeUp w-24 h-[1px] bg-gradient-to-r from-transparent via-rosegold-dark to-transparent mx-auto mb-10" style={{ animationDelay: '300ms' }}></div>
              <div className="opacity-0 animate-fadeUp text-xl md:text-2xl font-sans text-gray-700 leading-[1.8] font-light max-w-xl mx-auto space-y-8" style={{ animationDelay: '500ms' }}>
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
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-8 md:p-14 min-h-[550px] flex flex-col items-center">
              <h2 className="opacity-0 animate-fadeUp text-3xl md:text-4xl font-serif text-rosegold-dark mb-10 text-center italic" style={{ animationDelay: '100ms' }}>Koleksi Wajah Favoritku</h2>

              <div className="opacity-0 animate-fadeUp grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-h-[55vh] overflow-y-auto pr-3 pb-6 scrollbar-thin scrollbar-thumb-rosegold/30 scrollbar-track-transparent" style={{ animationDelay: '300ms' }}>
                {imageFilenames.map((img, idx) => {
                  // asimetris rotation untuk efek polaroid tumpuk
                  const rotation = idx % 2 === 0 ? `rotate-${Math.floor(Math.random() * 3) + 1}` : `-rotate-${Math.floor(Math.random() * 3) + 1}`;
                  return (
                    <div key={idx} className={`relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg p-2 bg-white/70 border border-white/80 group transition-transform duration-500 hover:scale-110 hover:z-20 transform ${rotation}`}>
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={`/image/${img}`}
                          alt="memory bg"
                          layout="fill"
                          objectFit="cover"
                          className="blur-2xl opacity-50 scale-125"
                        />
                      </div>
                      <div className="relative z-10 w-full h-full rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
                        <Image
                          src={`/image/${img}`}
                          alt="memory"
                          layout="fill"
                          objectFit="contain"
                          className="rounded"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="opacity-0 animate-fadeUp mt-8 text-base text-gray-500 italic text-center font-serif" style={{ animationDelay: '500ms' }}>&quot;Sekarang cuma bisa mandangin lewat layar hp, tapi sayangnya beneran nembus sampai ke hati.&quot;</p>
            </div>
          )}

          {/* Card 3: Appreciation */}
          {currentCard === 3 && (
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-10 md:p-16 min-h-[550px] flex flex-col justify-center items-center">
              <h2 className="opacity-0 animate-fadeUp text-4xl font-serif text-rosegold-dark text-center mb-14" style={{ animationDelay: '100ms' }}>Hal yang Aku Suka Dari Kamu</h2>

              <ul className="space-y-8 max-w-lg mx-auto w-full text-gray-700 text-xl font-sans">
                <li className="opacity-0 animate-fadeUp flex items-start space-x-5" style={{ animationDelay: '300ms' }}>
                  <span className="text-rosegold-dark text-2xl mt-1 drop-shadow-[0_0_4px_rgba(183,110,121,0.5)] blur-[0.5px]">🌟</span>
                  <span className="font-light leading-relaxed">caramu menemaniku ngobrol setiap hari, sampai rela ninggalin game cuma buat balas pesanku</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-5" style={{ animationDelay: '500ms' }}>
                  <span className="text-rosegold-light text-2xl mt-1 drop-shadow-[0_0_4px_rgba(253,232,232,0.8)] blur-[0.5px]">❤️</span>
                  <span className="font-light leading-relaxed">keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-5" style={{ animationDelay: '700ms' }}>
                  <span className="text-rosegold-dark text-2xl mt-1 drop-shadow-[0_0_4px_rgba(183,110,121,0.5)] blur-[0.5px]">🌟</span>
                  <span className="font-light leading-relaxed">sifat cemburuan dan gengsimu yang diam-diam selalu berhasil bikin aku makin sayang</span>
                </li>
                <li className="opacity-0 animate-fadeUp flex items-start space-x-5" style={{ animationDelay: '900ms' }}>
                  <span className="text-rosegold-light text-2xl mt-1 drop-shadow-[0_0_4px_rgba(253,232,232,0.8)] blur-[0.5px]">❤️</span>
                  <span className="font-light leading-relaxed">caramu menjaga perasaanku, yang bikin aku selalu yakin dan rela menunggu sampai kita bisa bertemu nanti</span>
                </li>
              </ul>
            </div>
          )}

          {/* Card 4: The Conclusion */}
          {currentCard === 4 && (
            <div className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-12 md:p-20 min-h-[550px] flex flex-col justify-center">
              <h2 className="opacity-0 animate-fadeUp text-4xl font-serif text-rosegold-dark mb-10 text-left" style={{ animationDelay: '100ms' }}>Doaku Untukmu...</h2>

              <div className="opacity-0 animate-fadeUp text-xl md:text-2xl font-sans text-gray-700 leading-[2] font-light space-y-10" style={{ animationDelay: '300ms' }}>
                <p className="ml-8 md:ml-12 mr-4">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu. Makasih ya sudah sekuat ini dan pelan-pelan mau membuka hati lagi buat aku.
                </p>
                <p className="mr-8 md:mr-12 ml-4 text-right">
                  Walaupun raga kita belum bisa saling bertatap secara langsung, aku harap doa dan afeksiku selalu sampai ke kamu. Jangan pernah merasa sendirian lagi ya, ada aku di sini yang siap mendengarkan semua ceritamu.
                </p>
                <p className="font-serif text-3xl text-rosegold-dark mt-16 text-center italic opacity-90">
                  Selamat bertambah usia, sayang.
                </p>
              </div>

              <div className="opacity-0 animate-fadeUp mt-20 text-right mr-8" style={{ animationDelay: '600ms' }}>
                <p className="font-sans text-lg font-light text-gray-500 mb-2">Selamanya sedia buat kamu,</p>
                <p className="font-serif text-4xl text-rosegold-dark drop-shadow-sm">Ilham</p>
              </div>
            </div>
          )}

          {/* Card 5: Story Summary */}
          {currentCard === 5 && (
            <div id="story-summary" className="bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_10px_40px_-10px_rgba(183,110,121,0.2),0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl p-8 min-h-[550px] flex flex-col justify-center items-center aspect-[9/16] max-h-[80vh] mx-auto overflow-hidden relative">
              <div className="absolute inset-0 z-0 opacity-20 bg-[url('/image/IMG-20260326-WA0005.jpg')] bg-cover bg-center mix-blend-overlay"></div>

              <div className="z-10 w-full flex flex-col items-center text-center space-y-6">
                <h1 className="text-4xl font-serif text-rosegold-dark italic tracking-wide">Happy Birthday</h1>
                <h2 className="text-3xl font-serif text-rosegold font-medium">Ansa</h2>

                <div className="w-16 h-[1px] bg-rosegold-dark mx-auto my-4"></div>

                <div className="text-sm font-sans text-gray-800 leading-relaxed px-4 space-y-4 font-light bg-white/40 p-4 rounded-xl backdrop-blur-md border border-white/50">
                  <p className="italic">&quot;Keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku.&quot;</p>
                  <p>Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu.</p>
                  <p className="font-medium text-rosegold-dark mt-2">- Ilham -</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-6 w-full px-2">
                  {[imageFilenames[0], imageFilenames[4], imageFilenames[8]].map((img, idx) => (
                     <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-white/60">
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
          <div className="w-full max-w-2xl flex justify-between items-center mt-12 px-2 animate-fadeUp">
            <button
              onClick={prevCard}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border border-rosegold/20 bg-white/20 backdrop-blur-sm text-rosegold-dark font-medium shadow-sm hover:bg-white/40 hover:shadow-[0_0_15px_rgba(183,110,121,0.3)] hover:scale-105 transition-all duration-300 ${currentCard === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'}`}
            >
              <span>⏪</span>
              <span className="hidden sm:inline">Putar Kembali</span>
            </button>

            {currentCard < 5 ? (
              <button
                onClick={nextCard}
                className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-rosegold to-rosegold-dark text-white font-medium shadow-[0_4px_15px_rgba(183,110,121,0.4)] hover:shadow-[0_0_20px_rgba(183,110,121,0.6)] hover:scale-105 transition-all duration-300"
              >
                <span className="hidden sm:inline">Next</span>
                <span>⏩</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShareStory}
                  className="px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 font-sans text-sm text-rosegold-dark font-medium shadow-sm hover:bg-white/60 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>📷</span>
                  <span>Simpan sbg Story</span>
                </button>
                <div className="px-8 py-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 font-serif text-xl text-rosegold-dark italic font-medium shadow-sm flex items-center space-x-3">
                  <span>I Love You</span>
                  <span className="animate-pulse">❤️</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
