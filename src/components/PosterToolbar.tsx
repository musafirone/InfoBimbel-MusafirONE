import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Code2,
  Maximize2,
  Minimize2,
  Sparkles,
  Edit3,
  Share2,
} from 'lucide-react';
import { InfographicData } from '../types';

interface PosterToolbarProps {
  data: InfographicData;
  onPrint: () => void;
  onOpenAstroModal: () => void;
}

export const PosterToolbar: React.FC<PosterToolbarProps> = ({
  data,
  onPrint,
  onOpenAstroModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = `# ${data.conceptTitle}
**${data.subtitle}**
*Mata Pelajaran: ${data.subject} | Jenjang: ${data.gradeLevel}*

> **Rumus/Prinsip Inti:** ${data.summaryQuote}

---

## Tahapan Pembelajaran Visual:
${data.steps
  .map(
    (s, idx) => `### ${idx + 1}. ${s.title} [${s.badge}]
- **Deskripsi:** ${s.shortDesc}
- **Poin Kunci/Rumus:** \`${s.keyFormulaOrSnippet}\`
- **Analogi Visual:** ${s.visualTip}
`
  )
  .join('\n')}

---
**Tips / Fun Fact:** ${data.funFactOrTip}

*Diterbitkan oleh InfoBimbel MusafirONE • Developer by @wargaminiofficial*
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border-4 border-teal-600 rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(13,148,136,1)] text-slate-900 flex flex-wrap items-center justify-between gap-3">
      {/* Informative Hint */}
      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
        <span className="p-1.5 rounded-xl bg-amber-100 text-amber-900 border-2 border-amber-500 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <Edit3 className="w-4 h-4 text-amber-700" />
        </span>
        <span>
          <strong className="text-teal-950 font-black">Fitur Interaktif:</strong> Klik langsung bagian teks judul atau deskripsi di dalam poster untuk mengedit redaksi sebelum dicetak!
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          onClick={handleCopyMarkdown}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Tersalin!' : 'Salin Markdown'}</span>
        </button>

        <button
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl bg-rose-600 hover:bg-rose-700 text-white border-2 border-rose-800 shadow-[3px_3px_0px_0px_rgba(159,18,57,1)] active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Cetak / Simpan PDF</span>
        </button>

        <button
          onClick={onOpenAstroModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border-2 border-teal-600 shadow-[2px_2px_0px_0px_rgba(13,148,136,1)] active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-teal-700" />
          <span>Susunan Kode Astro.js</span>
        </button>
      </div>
    </div>
  );
};
