"use client";

import Link from "next/link";
import Image from "next/image";
import { games } from "@/data/gameData";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-16 sm:mb-20">
        <div className="inline-block mb-6 px-6 py-3 border-2 border-black bg-white">
          <p className="text-xs font-bold tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            SCHOOL OF HOSPITALITY & BUSINESS MANAGEMENT
          </p>
        </div>

        <div className="relative flex justify-center mb-8">
          {/* Soft brand-colored shades behind the logo */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(106,120,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(106,120,255,0.18), transparent 42%)",
              transform: "scale(1.05)",
            }}
          />
          <Image
            src="/xibition-logo.svg"
            alt="X-ibition UM6P Student Club Fair 5th Edition"
            width={900}
            height={230}
            className="w-full max-w-4xl h-auto"
            priority
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Hospitality Innovators Nexus
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Xbition 2026
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Elevating hospitality through interactive experiences. Engage, compete, and celebrate innovation.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-5 py-3 border-2 border-black bg-white font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {games.length} Games
          </div>
          <div className="px-5 py-3 border-2 border-black bg-white font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Multiplayer
          </div>
          <div className="px-5 py-3 border-2 border-black bg-white font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Interactive
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div className="game-card p-8 flex flex-col h-full cursor-pointer">
                {/* Icon placeholder - using black square instead of emoji */}
                <div className="mb-6 text-4xl">■</div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest text-gray-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {game.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {game.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {game.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-black">
                  <span className="text-xs font-bold text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {game.players}
                  </span>
                  <span className="text-sm font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    PLAY →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t-2 border-black">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-xs">
              FIN
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif" }}>FIN Club @ SHBM, UM6P</span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Made for Xbition 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
