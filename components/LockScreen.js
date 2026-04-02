import React, { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Heart } from "lucide-react";

export default function LockScreen() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Target Date: March 27, 2026 00:00:00
    const targetDate = new Date("2026-03-27T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      if (now >= targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Render a skeleton timer during SSR to prevent flash of content
  // while avoiding hydration mismatches with the dynamic numbers
  const displayTimeLeft = isClient ? timeLeft : { days: "--", hours: "--", minutes: "--", seconds: "--" };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-peach-light via-rosegold-light to-amber-soft/50 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden">

      {/* Ambient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-rosegold rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-soft rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-2xl w-full text-center flex flex-col items-center space-y-10 z-10 bg-white/40 backdrop-blur-xl border border-white/50 p-10 md:p-16 rounded-3xl shadow-[0_8px_32px_0_rgba(183,110,121,0.2)]">
        <div className="relative">
          <Heart className="text-rosegold-dark animate-pulseGlow filter drop-shadow-[0_0_10px_rgba(183,110,121,0.5)]" size={56} />
          {/* Subtle Sparkle */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full animate-sparkle shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-rosegold-dark drop-shadow-md px-4 leading-tight">
          Menunggu Hari <br/><span className="italic text-rosegold font-light mt-2 block">Spesialmu...</span>
        </h1>

        <p className="text-gray-700 text-lg md:text-xl font-sans font-light px-4 max-w-lg leading-relaxed">
          Sebuah koleksi kenangan kita sudah menunggu untuk dibuka. Sabar sedikit lagi ya, sampai waktu kita merayakanmu tiba.
        </p>

        <div className="flex justify-center gap-4 md:gap-8 flex-wrap w-full mt-10">
          {Object.entries(displayTimeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center w-24 h-28 md:w-32 md:h-36 bg-white/50 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(183,110,121,0.3)] border border-white/60 text-rosegold-dark hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="text-4xl md:text-6xl font-serif font-medium tracking-tight drop-shadow-sm group-hover:text-rosegold transition-colors">
                {typeof value === 'number' ? value.toString().padStart(2, "0") : value}
              </span>
              <span className="text-xs md:text-sm font-sans font-medium uppercase tracking-widest text-rosegold-dark/70 mt-3 group-hover:text-rosegold transition-colors">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center opacity-80">
           <div className="w-12 h-[1px] bg-rosegold-dark/40 mb-4"></div>
           <p className="text-sm font-sans text-rosegold-dark font-medium tracking-widest uppercase">27 Maret 2026</p>
        </div>
      </div>
    </div>
  );
}
