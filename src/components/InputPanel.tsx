import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  LayoutGrid,
  Layers,
  Wand2,
  BookOpen,
  GraduationCap,
  Sliders,
  Ratio,
  Lightbulb,
} from 'lucide-react';
import { PosterTheme, PosterLayout, AspectRatioPreset, GenerateRequestPayload } from '../types';

interface InputPanelProps {
  onGenerate: (payload: GenerateRequestPayload) => Promise<void>;
  isLoading: boolean;
  theme: PosterTheme;
  onThemeChange: (theme: PosterTheme) => void;
  layout: PosterLayout;
  onLayoutChange: (layout: PosterLayout) => void;
  aspectRatio: AspectRatioPreset;
  onAspectRatioChange: (ratio: AspectRatioPreset) => void;
}

const POPULAR_CONCEPTS = [
  { label: '☀️ Fotosintesis', concept: 'Proses Fotosintesis pada Tumbuhan', subject: 'Biologi' },
  { label: '🚀 Hukum Newton', concept: 'Hukum Gerak Newton (I, II, III)', subject: 'Fisika' },
  { label: '💧 Siklus Hidrologi', concept: 'Siklus Air / Hidrologi Bumi', subject: 'Geografi' },
  { label: '🧬 Replikasi DNA', concept: 'Proses Replikasi dan Transkripsi DNA', subject: 'Biologi' },
  { label: '⚡ Arus Listrik', concept: 'Prinsip Arus Listrik AC dan DC', subject: 'Fisika' },
  { label: '🏛️ Revolusi Industri', concept: 'Tahapan Revolusi Industri 1.0 sampai 4.0', subject: 'Sejarah' },
  { label: '🧪 Reaksi Asam-Basa', concept: 'Teori dan Indikator Reaksi Asam Basa', subject: 'Kimia' },
  { label: '🌌 Teori Relativitas', concept: 'Teori Relativitas Khusus Einstein', subject: 'Fisika' },
];

const THEMES: { id: PosterTheme; label: string; previewColor: string; desc: string }[] = [
  { id: 'vibrant', label: 'Vibrant Palette', previewColor: 'bg-rose-500 border-teal-500', desc: 'Teal, rose, amber & neo-brutalist pop' },
  { id: 'modern', label: 'Modern Slate', previewColor: 'bg-slate-800 border-emerald-400', desc: 'Kontras gelap elegan & emerald' },
  { id: 'blueprint', label: 'Tech Blueprint', previewColor: 'bg-blue-900 border-cyan-400', desc: 'Gaya skema teknis laboratorium' },
  { id: 'editorial', label: 'Warm Editorial', previewColor: 'bg-amber-50 border-amber-600', desc: 'Krem buku teks klasik & hangat' },
  { id: 'pastel', label: 'Pastel Academy', previewColor: 'bg-purple-100 border-purple-400', desc: 'Lembut, ramah & modern' },
  { id: 'cyberpunk', label: 'Cyber Edu', previewColor: 'bg-zinc-900 border-fuchsia-500', desc: 'Kontras neon violet & cyber lime' },
  { id: 'forest', label: 'Forest Eco', previewColor: 'bg-emerald-950 border-teal-300', desc: 'Tema botani, hijau & ilmiah' },
  { id: 'monochrome', label: 'Swiss Minimal', previewColor: 'bg-white border-zinc-900', desc: 'Monokrom bersih tanpa distraksi' },
  { id: 'sunset', label: 'Sunset Glow', previewColor: 'bg-rose-950 border-amber-400', desc: 'Gradasi hangat jingga & rose' },
];

const LAYOUTS: { id: PosterLayout; label: string; icon: string; desc: string }[] = [
  { id: 'timeline', label: 'Timeline Roadmap', icon: '📍', desc: 'Jalur kronologis vertikal terhubung' },
  { id: 'bento', label: 'Bento Grid', icon: '🍱', desc: 'Kotak modular asimetris modern' },
  { id: 'process', label: 'Process Flow', icon: '➡️', desc: 'Alur tahapan sekuensial terarah' },
  { id: 'cards', label: 'Deck Cards', icon: '🃏', desc: 'Kartu visual bernomor berurutan' },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  onGenerate,
  isLoading,
  theme,
  onThemeChange,
  layout,
  onLayoutChange,
  aspectRatio,
  onAspectRatioChange,
}) => {
  const [concept, setConcept] = useState('');
  const [subject, setSubject] = useState('Biologi');
  const [gradeLevel, setGradeLevel] = useState('SMA / Sederajat');
  const [stepCount, setStepCount] = useState(4);
  const [customNotes, setCustomNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;
    onGenerate({
      concept: concept.trim(),
      subject,
      gradeLevel,
      stepCount,
      customNotes: customNotes.trim(),
    });
  };

  const handleSelectConcept = (item: { concept: string; subject: string }) => {
    setConcept(item.concept);
    setSubject(item.subject);
  };

  return (
    <div className="bg-white border-4 border-teal-600 rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(13,148,136,1)] text-slate-900">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-dashed border-teal-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-100 text-teal-800 border-2 border-teal-600 shadow-[2px_2px_0px_0px_rgba(13,148,136,1)]">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-teal-900 tracking-tight">Studio Pembuat Infografis</h2>
            <p className="text-xs sm:text-sm font-medium text-teal-700">Visualisasikan materi pelajaran menjadi fase infografis menarik dengan AI</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Concept Input */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-teal-900 mb-2">
            1. Konsep / Topik Pelajaran yang Ingin Dijelaskan: <span className="text-rose-600">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="input-concept-text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Contoh: Proses Fotosintesis, Hukum Newton, Struktur DNA..."
              className="w-full px-5 sm:px-6 py-4 bg-amber-50/40 border-4 border-teal-600 rounded-2xl text-base sm:text-lg font-bold text-slate-900 placeholder-slate-400 shadow-[4px_4px_0px_0px_rgba(13,148,136,1)] focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-200 transition"
              required
            />
          </div>

          {/* Preset Ideas */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-teal-800 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Saran Cepat:
            </span>
            {POPULAR_CONCEPTS.slice(0, 5).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectConcept(item)}
                className="px-3 py-1 text-xs font-bold bg-amber-100/70 hover:bg-amber-200 text-amber-900 rounded-full border border-amber-300 transition active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-teal-900 mb-1.5 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" /> Mata Pelajaran
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-teal-600 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-[2px_2px_0px_0px_rgba(13,148,136,0.5)] focus:outline-none"
            >
              <option value="Biologi">Biologi</option>
              <option value="Fisika">Fisika</option>
              <option value="Kimia">Kimia</option>
              <option value="Matematika">Matematika</option>
              <option value="Geografi">Geografi</option>
              <option value="Sejarah">Sejarah</option>
              <option value="Informatika / Komputer">Informatika</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Sains Umum">Sains Umum</option>
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-xs font-bold text-teal-900 mb-1.5 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-rose-600" /> Tingkat Jenjang
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-teal-600 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-[2px_2px_0px_0px_rgba(13,148,136,0.5)] focus:outline-none"
            >
              <option value="SD / Madrasah">SD (Tingkat Dasar)</option>
              <option value="SMP / MTs">SMP / MTs</option>
              <option value="SMA / SMK / MA">SMA / SMK / MA</option>
              <option value="Perguruan Tinggi / Umum">Kuliah / Umum</option>
              <option value="Olimpiade Sains (OSN)">Tingkat Olimpiade</option>
            </select>
          </div>

          {/* Steps Count */}
          <div>
            <label className="block text-xs font-bold text-teal-900 mb-1.5 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-amber-600" /> Jumlah Langkah
            </label>
            <select
              value={stepCount}
              onChange={(e) => setStepCount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-teal-600 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-[2px_2px_0px_0px_rgba(13,148,136,0.5)] focus:outline-none"
            >
              <option value={3}>3 Langkah (Ringkas & Cepat)</option>
              <option value={4}>4 Langkah (Standar Rekomendasi)</option>
              <option value={5}>5 Langkah (Mendalam & Rinci)</option>
            </select>
          </div>
        </div>

        {/* Custom Notes / Specific Focus */}
        <div>
          <label className="block text-xs font-bold text-teal-900 mb-1.5">
            Fokus Khusus / Catatan Tambahan (Opsional)
          </label>
          <input
            type="text"
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="Misal: Sertakan reaksi kimia lengkap, analogi sehari-hari..."
            className="w-full px-3.5 py-2 bg-amber-50/30 border-2 border-teal-600 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white"
          />
        </div>

        {/* Theme & Layout Selector */}
        <div className="pt-4 border-t-2 border-teal-100 space-y-5">
          {/* Layout Selector */}
          <div>
            <label className="block text-xs font-black text-teal-900 uppercase tracking-wide mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-teal-700" /> Tata Letak Infografis
              </span>
              <span className="text-[11px] font-bold text-teal-600">Pilih struktur poster</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LAYOUTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onLayoutChange(item.id)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    layout === item.id
                      ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-[3px_3px_0px_0px_rgba(13,148,136,1)]'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-teal-400 hover:bg-teal-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{item.icon}</span>
                    {layout === item.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600"></span>
                    )}
                  </div>
                  <div className="font-black text-xs sm:text-sm text-slate-900">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-1">
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-black text-teal-900 uppercase tracking-wide mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-rose-600" /> Tema Visual Poster
              </span>
              <span className="text-[11px] font-bold text-rose-600">Palet warna & gaya kartu</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {THEMES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onThemeChange(item.id)}
                  className={`p-2.5 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                    theme === item.id
                      ? 'bg-rose-50 border-rose-500 text-rose-950 font-bold shadow-[3px_3px_0px_0px_rgba(225,29,72,1)]'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300 hover:bg-rose-50/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 shrink-0 ${item.previewColor} shadow-sm`}
                  ></div>
                  <div className="overflow-hidden">
                    <div className="font-black text-xs text-slate-900 truncate">{item.label}</div>
                    <div className="text-[9px] text-slate-500 font-medium truncate">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Switcher */}
          <div>
            <label className="block text-xs font-black text-teal-900 uppercase tracking-wide mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Ratio className="w-3.5 h-3.5 text-teal-700" /> Format Dimensi Cetak
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'a4', label: 'A4 Portrait', desc: 'Standar Cetak' },
                  { id: 'story', label: 'Story 9:16', desc: 'Mobile/IG' },
                  { id: 'landscape', label: 'Landscape 16:9', desc: 'Slide' },
                  { id: 'square', label: 'Square 1:1', desc: 'Feed' },
                ] as const
              ).map((ratio) => (
                <button
                  key={ratio.id}
                  type="button"
                  onClick={() => onAspectRatioChange(ratio.id)}
                  className={`py-2 px-3 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                    aspectRatio === ratio.id
                      ? 'bg-teal-600 border-teal-800 text-white shadow-[2px_2px_0px_0px_rgba(17,94,89,1)]'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-teal-50'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          id="btn-generate-infographic"
          disabled={isLoading || !concept.trim()}
          className="w-full py-4 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-base sm:text-lg tracking-wide border-4 border-teal-800 shadow-[6px_6px_0px_0px_rgba(17,94,89,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sedang Menganalisis Konsep dengan Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>JELASKAN & GENERATE POSTER INFOGRAFIS</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
