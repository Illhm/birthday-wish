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
    <div className="fixed inset-0 z-50 bg-pink-50/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full text-center flex flex-col items-center space-y-8">
        <Heart className="text-pink-400 animate-pulse" size={48} />

        <h1 className="text-3xl md:text-5xl font-serif text-pink-600 drop-shadow-sm px-4">
          The countdown to your special day has begun...
        </h1>

        <p className="text-gray-600 text-lg md:text-xl font-medium px-4 max-w-md">
          A collection of our most cherished memories is waiting for you. Just a little bit longer until we celebrate you.
        </p>

        <div className="flex justify-center gap-3 md:gap-6 flex-wrap w-full mt-8">
          {Object.entries(displayTimeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center w-20 h-24 md:w-28 md:h-32 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 text-pink-500"
            >
              <span className="text-3xl md:text-5xl font-bold font-mono tracking-tight drop-shadow-md">
                {typeof value === 'number' ? value.toString().padStart(2, "0") : value}
              </span>
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-pink-400 mt-2">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 opacity-70">
           <p className="text-sm text-pink-400 font-medium tracking-wide">March 27, 2026</p>
        </div>
      </div>
    </div>
  );
}
