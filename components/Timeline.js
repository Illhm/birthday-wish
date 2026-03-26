import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, startOfDay, addDays } from 'date-fns';
import { Lock, Heart, Star, Sparkles, Gift } from 'lucide-react';

// Using a date slightly in the future relative to "now" for demonstration
// Feel free to replace this with the actual target date!
// Provide a default static target date so it doesn't change on every render during SSR
const STATIC_TARGET_DATE = startOfDay(addDays(new Date('2026-03-29'), 0));

const TimelineNode = ({ day, isLocked, message, icon: Icon, date }) => {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    const currentNode = nodeRef.current;
    if (currentNode) {
      observer.observe(currentNode);
    }

    return () => {
      if (currentNode) {
        observer.unobserve(currentNode);
      }
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full mb-12 last:mb-0 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Timeline line connecting nodes */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-pink-200/50 -z-10 group-last:hidden" />

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />

      {/* Icon node in the center */}
      <div className={`
        relative flex items-center justify-center w-12 h-12 rounded-full border-4 z-10 shrink-0
        transition-transform duration-300 group-hover:scale-110
        ${isLocked ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-pink-100 border-pink-300 text-pink-500 shadow-lg shadow-pink-200'}
      `}>
        {isLocked ? <Lock size={20} /> : <Icon size={24} />}
      </div>

      {/* Card */}
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-4 md:ml-0">
        <div className={`
          p-6 rounded-2xl shadow-xl transition-all duration-300
          ${isLocked
            ? 'bg-white/30 backdrop-blur-md border border-white/40'
            : 'bg-white/90 hover:shadow-pink-200/50 hover:-translate-y-1'
          }
        `}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-bold ${isLocked ? 'text-gray-400' : 'text-pink-500'}`}>
              Day {day}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="relative overflow-hidden">
            {isLocked ? (
              <div className="flex flex-col items-center justify-center py-4 space-y-2 text-gray-400">
                <Lock size={32} className="opacity-50" />
                <p className="text-sm font-medium italic">Unlocks soon...</p>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed font-medium">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ events }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    // Set initial date only on the client to avoid SSR hydration mismatch
    const initialNow = new Date();
    setNow(initialNow);

    // Using an actual fixed target date instead of evaluating relative to the server start time
    // Here we make a dummy target date strictly 3 days from the current client time for demo purposes.
    // In a real scenario, this would be a fixed date like new Date('2026-05-15')
    const targetDate = startOfDay(addDays(initialNow, 3));

    const calculateTimeLeft = (currentDate) => {
      const days = Math.max(0, differenceInDays(targetDate, currentDate));
      const hours = Math.max(0, differenceInHours(targetDate, currentDate) % 24);
      const minutes = Math.max(0, differenceInMinutes(targetDate, currentDate) % 60);
      const seconds = Math.max(0, differenceInSeconds(targetDate, currentDate) % 60);
      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft(initialNow));

    const timer = setInterval(() => {
      const currentDate = new Date();
      setNow(currentDate);
      setTimeLeft(calculateTimeLeft(currentDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent rendering on the server to avoid hydration issues with date/time
  if (!now || !timeLeft) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Countdown Timer */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-pink-600 mb-8 drop-shadow-sm">
          Counting down to your special day...
        </h2>
        <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 text-pink-500"
            >
              <span className="text-3xl md:text-5xl font-bold font-mono tracking-tight drop-shadow-md">
                {value.toString().padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base font-medium uppercase tracking-wider text-pink-400 mt-2">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-20">
        <div className="flex flex-col items-center">
          {events.map((event, index) => {
            // Check if the event's date is on or before today
            const isLocked = event.date > now;

            return (
              <TimelineNode
                key={event.day}
                day={event.day}
                date={event.date}
                isLocked={isLocked}
                message={event.message}
                icon={event.icon}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Timeline;