import React from 'react';
import { Sparkles, BookOpen, Code2, Printer, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenAstroModal: () => void;
  onSelectPreset: (key: string) => void;
  activePresetKey?: string;
  onPrint: () => void;
  avatarUrl: string;
  onUpdateAvatarUrl: (url: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAstroModal,
  onSelectPreset,
  activePresetKey,
  onPrint,
  avatarUrl,
  onUpdateAvatarUrl,
}) => {
  const [showAvatarEdit, setShowAvatarEdit] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(avatarUrl);

  const handleSaveAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAvatarUrl(tempUrl.trim());
    setShowAvatarEdit(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-teal-500 shadow-sm text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowAvatarEdit(!showAvatarEdit)}
              title="Klik untuk mengubah foto profil"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-100 rounded-2xl border-2 border-teal-600 flex items-center justify-center overflow-hidden shadow-[3px_3px_0px_0px_rgba(13,148,136,1)] transition-transform group-hover:scale-105">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="MusafirONE Logo Profile"
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="bg-teal-600 text-white font-black text-xl">M1</div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-1 border-2 border-white text-white shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-teal-800">
                  InfoBimbel <span className="text-rose-600">MusafirONE</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 text-xs font-black rounded-full bg-teal-100 text-teal-800 border-2 border-teal-500">
                  AI Infografis Edukasi
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-teal-700/80 truncate max-w-[220px] sm:max-w-md">
                Generator Poster Pembelajaran Visual & Diagram Konsep Interaktif
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onPrint}
              id="header-btn-print"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-white hover:bg-teal-50 text-teal-900 border-2 border-teal-600 shadow-[3px_3px_0px_0px_rgba(13,148,136,1)] active:translate-y-0.5 active:shadow-none transition-all"
              title="Cetak atau Simpan PDF"
            >
              <Printer className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Cetak Poster</span>
              <span className="sm:hidden">Cetak</span>
            </button>

            <button
              onClick={onOpenAstroModal}
              id="header-btn-astro"
              className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-2 border-teal-800 shadow-[3px_3px_0px_0px_rgba(17,94,89,1)] active:translate-y-0.5 active:shadow-none transition-all"
              title="Lihat Source Code Astro.js & Cloudflare Workers"
            >
              <Code2 className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Kode Astro.js</span>
              <span className="sm:hidden">Astro</span>
            </button>
          </div>
        </div>

        {/* Quick presets chip bar */}
        <div className="py-3 border-t-2 border-teal-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-teal-800 flex items-center gap-1 font-bold shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            Topik Cepat:
          </span>
          <button
            onClick={() => onSelectPreset('fotosintesis')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activePresetKey === 'fotosintesis'
                ? 'bg-rose-600 text-white border-2 border-rose-700 shadow-[2px_2px_0px_0px_rgba(190,18,60,1)]'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-2 border-teal-300 shadow-[2px_2px_0px_0px_rgba(20,184,166,0.5)]'
            }`}
          >
            ☀️ Proses Fotosintesis
          </button>
          <button
            onClick={() => onSelectPreset('hukum_newton')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activePresetKey === 'hukum_newton'
                ? 'bg-rose-600 text-white border-2 border-rose-700 shadow-[2px_2px_0px_0px_rgba(190,18,60,1)]'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-2 border-teal-300 shadow-[2px_2px_0px_0px_rgba(20,184,166,0.5)]'
            }`}
          >
            🚀 Hukum Gerak Newton
          </button>
          <button
            onClick={() => onSelectPreset('sirkulasi_darah')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activePresetKey === 'sirkulasi_darah'
                ? 'bg-rose-600 text-white border-2 border-rose-700 shadow-[2px_2px_0px_0px_rgba(190,18,60,1)]'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-2 border-teal-300 shadow-[2px_2px_0px_0px_rgba(20,184,166,0.5)]'
            }`}
          >
            💧 Sistem Sirkulasi Darah
          </button>
        </div>
      </div>

      {/* Avatar configuration popover */}
      {showAvatarEdit && (
        <div className="absolute top-24 left-4 sm:left-12 z-50 w-80 bg-white border-4 border-teal-600 rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(13,148,136,1)]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-black text-teal-900 uppercase">Ganti Foto Profil MusafirONE</h4>
            <button
              onClick={() => setShowAvatarEdit(false)}
              className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSaveAvatar} className="space-y-3">
            <input
              type="url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://... URL Foto Profil Anda"
              className="w-full px-3 py-2 text-xs bg-amber-50/50 border-2 border-teal-600 rounded-xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setTempUrl('https://api.dicebear.com/7.x/bottts/svg?seed=MusafirONE');
                }}
                className="px-3 py-1.5 text-xs text-slate-600 font-bold hover:text-teal-700"
              >
                Reset Default
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl border-2 border-teal-800 shadow-[2px_2px_0px_0px_rgba(17,94,89,1)] active:translate-y-0.5"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};
