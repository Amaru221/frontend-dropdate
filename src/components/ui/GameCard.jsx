import { useEffect, useState } from "react";
import defaultImage from "../../assets/steam_logo_art_2000.0.webp";
import { getTimeLeft, format, formatReleaseDate } from "../../helpers/format.dates";

export default function GameCard({ game }) {
  const imageUrl = game.image || defaultImage;

  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft(game.releaseDate)
  );

  useEffect(() => {
    if (!game.releaseDate) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(game.releaseDate));
    }, 60000); // actualiza cada minuto

    return () => clearInterval(interval);
  }, [game.releaseDate]);

  const isThisMonth =
    timeLeft && timeLeft.days !== null && timeLeft.days <=30;

  return (
    <div className="relative h-140 rounded-2xl overflow-hidden group cursor-pointer">
      {/* 🖼️ Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* 📦 Content */}
      <div className="absolute bottom-0 w-full p-5">
          {/* 🔴 LIVE INDICATOR */}
        <div class="inline-flex items-center space-x-2 bg-[#c9bfff]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#c9bfff]/30 mb-6">
          <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9bfff] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-[#c9bfff]"></span>
          </span>
          <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c9bfff]">Global Release • {formatReleaseDate(game.releaseDate)}</span>
        </div>
        {/* 🎮 Title */}
        <h3 className="font-headline text-white font-bold text-7xl leading-tight">
          {game.title}
        </h3>

        <div className="mt-3 flex items-center justify-left gap-20 pb-5">

          {/* ⏳ LEFT SIDE: TIMER o FECHA */}
          <div>
            {isThisMonth ? (
              <>
                {/* COUNTDOWN */}
                <div className="font-headline text-blue-300 text-4xl tracking-wide">
                  {format(timeLeft.days)} : {format(timeLeft.hours)} : {format(timeLeft.minutes)}
                </div>

                <div className="font-headline gap-2 flex">
                  <span className="text-xs text-gray-300">DAYS</span>
                  <span className="text-xs text-gray-300">:</span>
                  <span className="text-xs text-gray-300">HRS</span>
                  <span className="text-xs text-gray-300">:</span>
                  <span className="text-xs text-gray-300">MINS</span>
                </div>
              </>
            ) : (
              /* NORMAL DATE */
              <div className="font-headline text-2xl text-gray-300">
                {game.releaseDate
                  ? new Date(game.releaseDate).toLocaleDateString()
                  : "TBA"}
              </div>
            )}
          </div>

          {/* 💜 CTA (SIEMPRE VISIBLE) */}
          <button
            className="
              px-8 py-4
              text-xl font-semibold
              rounded-lg
              bg-gradient-to-r from-[#b7aeee] to-[#8375d4]
              text-[#2e009c]
              shadow-md
              hover:scale-105
              hover:shadow-[0_0_20px_rgba(201,191,255,0.4)]
              transition-all duration-200
            "
          >
            NOTIFY ME
          </button>

        </div>
      </div>
    </div>
  );
}

