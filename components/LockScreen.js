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
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-br from-champagne-light via-rosegold-light/50 to-blush-light animate-auroraBg bg-[length:200%_200%]">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[30rem] h-[30rem] bg-rosequartz/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-champagne-dark/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-[40rem] h-[40rem] bg-blush-dark/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/80 blur-[1px] shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] animate-firefly"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="glass-panel-heavy p-8 md:p-14 rounded-[40px] max-w-2xl w-full text-center flex flex-col items-center space-y-10 z-10 relative overflow-hidden animate-scale-in shadow-soft-aura">
        <div className="absolute inset-0 bg-white/20 z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <Heart className="text-rosegold-deep animate-heartbeat mb-6 drop-shadow-md" size={42} strokeWidth={1.5} />

          <h1 className="text-3xl md:text-5xl font-serif text-rosegold-deep tracking-wide leading-tight px-2 mb-4 drop-shadow-sm">
            Menunggu Hari Spesialmu...
          </h1>

          <p className="text-gray-600/90 text-base md:text-lg font-sans font-light px-4 max-w-md leading-relaxed">
            Kumpulan memori indah telah disiapkan. Sedikit lagi waktu berlalu sampai kita merayakanmu.
          </p>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap w-full mt-12">
            {Object.entries(displayTimeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="flex flex-col items-center justify-center w-20 h-24 md:w-28 md:h-32 bg-white/30 backdrop-blur-xl rounded-[2rem] shadow-premium-glass text-rosegold-deep group hover:scale-105 hover:bg-white/40 hover:shadow-glow-gold transition-all duration-500 ease-out"
              >
                <span className="text-3xl md:text-5xl font-serif font-medium tracking-tight group-hover:drop-shadow-md transition-all">
                  {typeof value === 'number' ? value.toString().padStart(2, "0") : value}
                </span>
                <span className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-rosegold mt-3 opacity-80">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 inline-block px-6 py-2 rounded-full border border-rosegold/20 bg-white/30 backdrop-blur-sm shadow-sm">
             <p className="text-sm font-serif text-rosegold-deep tracking-widest italic opacity-80">27 Maret 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
