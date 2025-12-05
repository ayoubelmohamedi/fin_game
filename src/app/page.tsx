"use client";

import Link from "next/link";
import { games } from "@/data/gameData";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          School of Hospitality & Business Management
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            FIN Club
          </span>{" "}
          Xbition 2026
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
          Explore our collection of interactive games combining{" "}
          <span className="text-indigo-400">hospitality</span> and{" "}
          <span className="text-purple-400">technology</span>. Perfect for team
          building and fun events!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <span>🎮</span>
            <span>{games.length} Games</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <span>👥</span>
            <span>Multiplayer</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300">
            <span>⚡</span>
            <span>Interactive</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Link
              key={game.id}
              href={`/game/${game.id}`}
              className="game-card group relative overflow-hidden p-6 flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {game.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                  {game.subtitle}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {game.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{game.description}</p>
              </div>

              {/* Footer */}
              <div className="relative flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <span className="text-xs text-white/40">{game.players}</span>
                <span className="flex items-center gap-1 text-indigo-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Play Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
              FIN
            </div>
            <span>FIN Club @ SHBM, UM6P</span>
          </div>
          <div>Made with ❤️ for Xbition 2026</div>
        </div>
      </footer>
    </div>
  );
}
