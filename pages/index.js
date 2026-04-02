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
    <div className="min-h-screen relative font-sans text-rosegold-dark overflow-hidden bg-gradient-to-br from-champagne-light via-blush-light/50 to-rosegold-light/40 animate-auroraBg bg-[length:200%_200%]">

      {/* Redesigned Ambient Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft glowing orbs */}
        <div className="absolute top-0 -left-40 w-[40rem] h-[40rem] bg-rosequartz/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 -right-20 w-[45rem] h-[45rem] bg-champagne-dark/20 rounded-full mix-blend-multiply filter blur-[130px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/4 w-[50rem] h-[50rem] bg-blush-dark/15 rounded-full mix-blend-multiply filter blur-[140px] opacity-80 animate-blob animation-delay-4000"></div>

        {/* Decorative floating particles */}
         {[...Array(25)].map((_, i) => (
           <div
             key={i}
             className="absolute rounded-full bg-white/80 blur-[1px] shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] animate-firefly"
             style={{
               width: `${Math.random() * 5 + 2}px`,
               height: `${Math.random() * 5 + 2}px`,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDuration: `${5 + Math.random() * 10}s`,
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
            <div className="animate-float-slow p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
               {/* Soft envelope aura */}
               <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-soft-aura pointer-events-none border border-white/60"></div>
               <div className="absolute inset-0 paper-texture opacity-30 rounded-[3rem] pointer-events-none"></div>

               <div className="relative z-10 w-full">
                 <StaggeredText
                   text="Ada pesan puitis yang menunggu untukmu..."
                   className="text-3xl md:text-5xl font-serif text-rosegold-deep mb-20 tracking-wide leading-[1.6] drop-shadow-sm px-4"
                 />
                 <button
                   onClick={handleStart}
                   className="opacity-0 animate-fadeUp relative group px-12 py-5 rounded-full border border-rosegold/30 bg-white/60 backdrop-blur-md text-rosegold-deep font-sans tracking-[0.2em] uppercase text-sm font-semibold shadow-premium-glass hover:bg-gradient-to-r hover:from-gold-dark hover:via-gold hover:to-gold-dark hover:text-white hover:shadow-glow-gold hover:scale-[1.03] transition-all duration-700 ease-out flex items-center justify-center space-x-4 overflow-hidden mx-auto"
                   style={{ animationDelay: '1200ms' }}
                 >
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer pointer-events-none"></div>
                   <span className="relative z-10 transition-colors duration-500">Buka Surat</span>
                   <span className="text-2xl drop-shadow-sm relative z-10 group-hover:animate-pulse transition-transform duration-500 group-hover:scale-110">💌</span>
                 </button>
               </div>
            </div>
          )}

          {/* Card 1: The Hook */}
          {currentCard === 1 && (
            <div className="p-8 md:p-12 text-center min-h-[600px] flex flex-col justify-center relative">
              <h1 className="opacity-0 animate-letterReveal text-5xl md:text-7xl font-serif font-medium mb-10 text-rosegold-deep tracking-wide leading-tight drop-shadow-sm" style={{ animationDelay: '100ms' }}>
                Selamat Ulang Tahun, <br />
                <span className="font-cursive text-gradient-gold text-7xl md:text-9xl mt-6 inline-block pr-4 animate-sway origin-center">Ansa.</span>
              </h1>

              <div className="opacity-0 animate-fadeUp flex items-center justify-center space-x-6 my-12" style={{ animationDelay: '800ms' }}>
                 <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                 <span className="text-gold text-2xl animate-pulse">✨</span>
                 <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
              </div>

              <div className="opacity-0 animate-fadeUp text-lg md:text-2xl font-sans text-gray-800/90 leading-[2] font-light max-w-2xl mx-auto space-y-8 tracking-wide relative" style={{ animationDelay: '1200ms' }}>
                <div className="absolute -left-8 -top-8 text-6xl text-gold/20 font-serif">&quot;</div>
                <p className="relative z-10">
                  Hari ini adalah tentang kamu. Tentang cerewetmu yang selalu berhasil menghapus rasa sepiku, dan cara ngambekmu yang diam-diam selalu ngangenin.
                </p>
                <p className="relative z-10">
                  Aku bikin ini buat ngerayain hari lahir kamu di dunia, dan yang paling penting, merayakan kehadiranmu yang sudah pelan-pelan ngubah hari-hariku jadi jauh lebih baik.
                </p>
                <div className="absolute -right-8 -bottom-8 text-6xl text-gold/20 font-serif">&quot;</div>
              </div>
            </div>
          )}

          {/* Card 2: Visual Memory - Premium Scrapbook */}
          {currentCard === 2 && (
            <div className="bg-white/30 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 min-h-[700px] flex flex-col items-center relative shadow-premium-glass border border-white/50">
              <div className="absolute inset-0 paper-texture opacity-[0.15] rounded-[3rem] pointer-events-none"></div>

              <h2 className="opacity-0 animate-fadeUp text-4xl md:text-5xl font-serif text-rosegold-deep mb-16 text-center drop-shadow-sm relative z-10" style={{ animationDelay: '100ms' }}>
                <span className="italic font-light">Koleksi</span> <br/>
                <span className="font-cursive text-5xl md:text-6xl text-gradient-gold">Wajah Favoritku</span>
              </h2>

              {/* Premium Scrapbook Container */}
              <div className="opacity-0 animate-fadeUp w-full max-h-[60vh] overflow-y-auto overflow-x-hidden pr-4 pb-16 custom-scrollbar relative z-10" style={{ animationDelay: '400ms' }}>
                <div className="columns-2 md:columns-3 gap-8 space-y-10 pb-8 mx-auto px-4">
                  {imageFilenames.map((img, idx) => {
                    // More varied, expressive rotations for a true scattered polaroid feel
                    const rotations = ['rotate-[-6deg]', 'rotate-[4deg]', 'rotate-[-3deg]', 'rotate-[7deg]', 'rotate-[-2deg]', 'rotate-[5deg]'];
                    const rotation = rotations[idx % rotations.length];
                    const mt = idx % 2 !== 0 ? 'mt-12' : 'mt-0';
                    const isFeatured = idx % 5 === 0;

                    return (
                      <div
                        key={idx}
                        className={`break-inside-avoid relative w-full bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-6 hover:z-40 hover:shadow-[0_30px_60px_-15px_rgba(183,110,121,0.4)] transform ${rotation} ${mt} ${isFeatured ? 'scale-105' : 'scale-95'}`}
                      >
                        {/* Premium elegant tape */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-white/60 backdrop-blur-sm border border-white/80 rotate-[-3deg] shadow-sm z-20 opacity-80 mix-blend-overlay"></div>

                        <div className="relative aspect-[3/4] w-full overflow-hidden shadow-inner bg-gray-100">
                          <Image
                            src={`/image/${img}`}
                            alt="memory"
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-[0.95]"
                          />
                        </div>

                        {/* Soft corner flourish on polaroid */}
                        {isFeatured && <div className="absolute bottom-4 right-4 text-rosegold/30 font-cursive text-2xl rotate-[-10deg]">Ansa</div>}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none rounded-b-[3rem] z-20"></div>

              <div className="opacity-0 animate-fadeUp mt-8 text-lg text-gray-700/90 italic text-center font-serif relative z-30 px-8 py-4" style={{ animationDelay: '800ms' }}>
                <p>&quot;Sekarang cuma bisa mandangin lewat layar hp, tapi sayangnya beneran nembus sampai ke hati.&quot;</p>
                <div className="w-12 h-[1px] bg-rosegold/40 mx-auto mt-4"></div>
              </div>
            </div>
          )}

          {/* Card 3: Appreciation */}
          {currentCard === 3 && (
            <div className="p-10 md:p-16 text-center min-h-[600px] flex flex-col justify-center relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-rosegold/5 rounded-full blur-[100px] pointer-events-none"></div>

              <h2 className="opacity-0 animate-fadeUp text-4xl md:text-5xl font-serif text-rosegold-deep mb-20 drop-shadow-sm" style={{ animationDelay: '100ms' }}>
                <span className="italic">Hal yang</span> <br/>
                <span className="font-cursive text-6xl md:text-7xl text-gradient-gold inline-block mt-4">Aku Suka Dari Kamu</span>
              </h2>

              <div className="space-y-12 max-w-2xl mx-auto w-full text-gray-800/90 text-lg md:text-xl font-sans relative z-10 flex flex-col items-center">
                <div className="opacity-0 animate-fadeUp bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-premium-glass border border-white/60 transform hover:scale-105 transition-all duration-500 w-[90%] md:w-[80%] ml-[-10%]" style={{ animationDelay: '300ms' }}>
                  <span className="font-light leading-[1.8] italic">&quot;Caramu menemaniku ngobrol setiap hari, sampai rela ninggalin game cuma buat balas pesanku.&quot;</span>
                  <div className="absolute -top-4 -left-4 text-3xl opacity-50">✨</div>
                </div>

                <div className="opacity-0 animate-fadeUp bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-premium-glass border border-white/60 transform hover:scale-105 transition-all duration-500 w-[90%] md:w-[80%] mr-[-10%]" style={{ animationDelay: '600ms' }}>
                  <span className="font-light leading-[1.8] italic">&quot;Keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku.&quot;</span>
                  <div className="absolute -bottom-4 -right-4 text-3xl opacity-50">❤️</div>
                </div>

                <div className="opacity-0 animate-fadeUp bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-premium-glass border border-white/60 transform hover:scale-105 transition-all duration-500 w-[90%] md:w-[80%] ml-[-5%]" style={{ animationDelay: '900ms' }}>
                  <span className="font-light leading-[1.8] italic">&quot;Caramu menjaga perasaanku, yang bikin aku selalu yakin dan rela menunggu sampai kita bisa bertemu nanti.&quot;</span>
                  <div className="absolute -top-4 right-4 text-3xl opacity-50">🌟</div>
                </div>
              </div>
            </div>
          )}

          {/* Card 4: The Conclusion - Premium Letter */}
          {currentCard === 4 && (
            <div className="bg-white/70 backdrop-blur-2xl p-12 md:p-20 rounded-[3rem] min-h-[600px] flex flex-col justify-center relative overflow-hidden shadow-premium-glass border border-white/80">
              <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none"></div>

              {/* Elegant corner flourishes */}
              <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-rosegold/30 rounded-tl-3xl"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-rosegold/30 rounded-br-3xl"></div>

              <h2 className="opacity-0 animate-fadeUp text-4xl font-serif text-rosegold-deep mb-16 text-center italic" style={{ animationDelay: '100ms' }}>Doaku Untukmu...</h2>

              <div className="opacity-0 animate-fadeUp text-lg md:text-xl font-sans text-gray-800/90 leading-[2.4] font-light space-y-8 relative z-10 max-w-2xl mx-auto" style={{ animationDelay: '400ms' }}>
                <p className="indent-10">
                  Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu. Makasih ya sudah sekuat ini dan pelan-pelan mau membuka hati lagi buat aku.
                </p>
                <p className="indent-10">
                  Walaupun raga kita belum bisa saling bertatap secara langsung, aku harap doa dan afeksiku selalu sampai ke kamu. Jangan pernah merasa sendirian lagi ya, ada aku di sini yang siap mendengarkan semua ceritamu.
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rosegold-deep/40 to-transparent mx-auto mt-12 mb-8"></div>
                <p className="font-serif text-3xl text-rosegold-deep text-center italic opacity-90 drop-shadow-sm mt-8">
                  Selamat bertambah usia, sayang.
                </p>
              </div>

              <div className="opacity-0 animate-fadeUp mt-16 text-center relative z-10" style={{ animationDelay: '800ms' }}>
                <p className="font-sans text-sm font-light text-gray-500 mb-2 uppercase tracking-widest">Selamanya sedia buat kamu,</p>
                <p className="font-cursive text-6xl md:text-7xl text-gradient-gold drop-shadow-sm transform -rotate-2 inline-block">Ilham</p>
              </div>
            </div>
          )}

          {/* Card 5: Story Summary - Exportable Keepsake */}
          {currentCard === 5 && (
            <div id="story-summary" className="bg-gradient-to-b from-white/95 to-champagne-light/95 backdrop-blur-3xl border border-white shadow-[0_30px_60px_-15px_rgba(183,110,121,0.3)] rounded-[3rem] p-8 md:p-10 min-h-[600px] flex flex-col justify-center items-center aspect-[9/16] max-h-[85vh] mx-auto overflow-hidden relative soft-grain">

              {/* Premium Inner Border */}
              <div className="absolute inset-4 border border-rosegold/20 rounded-[2.5rem] pointer-events-none"></div>

              <div className="z-10 w-full flex flex-col items-center text-center h-full justify-between py-4">
                <div className="w-full mt-4">
                   <h1 className="text-xl md:text-2xl font-sans tracking-[0.3em] text-gray-500 uppercase mb-4">Happy Birthday</h1>
                   <h2 className="font-cursive text-7xl md:text-8xl text-gradient-gold drop-shadow-md -mt-2 mb-6">Ansa</h2>
                   <div className="w-12 h-[2px] bg-rosegold-deep/40 mx-auto"></div>
                </div>

                <div className="my-auto w-full relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rosegold/5 rounded-full blur-[40px] pointer-events-none"></div>
                  <div className="text-base md:text-lg font-serif text-gray-800/90 leading-[2] px-6 py-8 font-light relative z-10 italic">
                    <p className="mb-6">&quot;Keberanianmu untuk melawan rasa trauma dan pelan-pelan membuka hati lagi untukku.&quot;</p>
                    <p className="text-gray-600">Semoga tahun ini membawa lebih banyak kebahagiaan dan ketenangan buat hati kamu.</p>
                  </div>
                </div>

                <div className="w-full mb-4">
                  <div className="flex justify-center items-end h-32 md:h-40 relative px-4">
                    {[imageFilenames[0], imageFilenames[4], imageFilenames[8]].map((img, idx) => {
                       const styles = [
                         "absolute left-4 md:left-8 bottom-0 w-24 md:w-32 rotate-[-12deg] z-10",
                         "relative z-30 w-28 md:w-36 scale-110 -translate-y-4 shadow-xl",
                         "absolute right-4 md:right-8 bottom-0 w-24 md:w-32 rotate-[12deg] z-20"
                       ];

                       return (
                         <div key={idx} className={`${styles[idx]} aspect-[3/4] rounded-xl overflow-hidden border-[4px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] bg-white`}>
                           <Image src={`/image/${img}`} alt="memory" layout="fill" objectFit="cover" className="filter contrast-[0.95]" />
                         </div>
                       )
                    })}
                  </div>
                  <p className="font-cursive text-4xl text-rosegold-deep mt-10">- Ilham -</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Controls - More Elegant */}
        {currentCard > 0 && (
          <div className="w-full max-w-2xl flex justify-between items-center mt-12 px-2 animate-fadeUp relative z-20">
            <button
              onClick={prevCard}
              className={`flex items-center space-x-3 px-8 py-4 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl text-gray-700 font-sans tracking-[0.1em] text-xs uppercase font-medium shadow-glass hover:bg-white/80 hover:shadow-premium-glass hover:-translate-x-1 transition-all duration-500 ${currentCard === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'}`}
            >
              <span>←</span>
              <span className="hidden sm:inline">Kembali</span>
            </button>

            {currentCard < 5 ? (
              <button
                onClick={nextCard}
                className="flex items-center space-x-4 px-10 py-4 rounded-full bg-gradient-to-r from-rosegold-deep via-rosegold to-rosegold-deep text-white font-sans tracking-[0.1em] text-xs uppercase font-medium shadow-[0_10px_30px_rgba(183,110,121,0.5)] hover:shadow-[0_15px_40px_rgba(183,110,121,0.7)] hover:translate-x-1 transition-all duration-500 bg-[length:200%_auto] hover:bg-right"
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span>→</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={handleShareStory}
                  className="px-8 py-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 font-sans text-xs tracking-[0.1em] uppercase text-rosegold-deep font-semibold shadow-premium-glass hover:bg-white hover:scale-105 transition-all duration-500 flex items-center space-x-3"
                >
                  <span className="text-xl">📸</span>
                  <span>Simpan sbg Story</span>
                </button>
                <div className="px-10 py-4 rounded-full bg-gradient-to-r from-rosegold-light/30 to-blush-light/30 backdrop-blur-md border border-rosegold/30 shadow-inner flex items-center space-x-4">
                  <span className="font-cursive text-3xl text-rosegold-deep pt-1">I Love You</span>
                  <span className="animate-heartbeat text-rosegold-deep text-xl drop-shadow-md">❤️</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
