import React from 'react';
import { Heart, Sparkles, ShieldCheck, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  avatarUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ avatarUrl }) => {
  return (
    <footer className="mt-16 bg-white border-t-4 border-teal-500 text-teal-950 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border-2 border-teal-600 shadow-[3px_3px_0px_0px_rgba(13,148,136,1)] flex items-center justify-center overflow-hidden shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="MusafirONE Logo"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-teal-600 rounded-xl flex items-center justify-center font-black text-white text-base">
                  M1
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-teal-950 text-base tracking-tight">
                  InfoBimbel <span className="text-rose-600">MusafirONE</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-black bg-teal-100 text-teal-800 rounded-full border-2 border-teal-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" /> Terverifikasi
                </span>
              </div>
              <p className="text-xs font-medium text-teal-700/80">
                Platform Generator Infografis & Visual Roadmap Pembelajaran Sains & Akademis
              </p>
            </div>
          </div>

          {/* Mandatory Developer Attribution */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-50 border-2 border-teal-600 text-xs font-black text-teal-900 shadow-[3px_3px_0px_0px_rgba(13,148,136,1)]">
              <span>Developer by</span>
              <a
                href="https://instagram.com/wargaminiofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:text-rose-700 transition underline-offset-2 hover:underline inline-flex items-center gap-1 font-black"
              >
                @wargaminiofficial
                <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
              </a>
            </div>
            <p className="text-xs font-semibold text-teal-700/80">
              Didukung AI Gemini & Arsitektur Astro.js / Cloudflare Workers
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-teal-700">
          <p>© {new Date().getFullYear()} InfoBimbel MusafirONE. Semua materi edukasi siap cetak & bebas digunakan untuk belajar.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-teal-800 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Format Poster Standar Akademik Siap Cetak
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
