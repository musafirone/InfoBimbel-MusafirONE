import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, CheckCircle2, Cloud } from 'lucide-react';

interface AstroCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstroCodeModal: React.FC<AstroCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'index' | 'api' | 'component' | 'config' | 'wrangler'>('index');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const files = {
    index: {
      filename: 'src/pages/index.astro',
      lang: 'astro',
      description: 'Halaman utama Astro.js dengan Form Input Interaktif dan Layout Poster',
      code: `---
// src/pages/index.astro
// InfoBimbel MusafirONE - Astro.js (Cloudflare Workers Edition)
import Layout from '../layouts/Layout.astro';
import InfographicPoster from '../components/InfographicPoster.astro';

let infographicData = null;
let error = null;

if (Astro.request.method === 'POST') {
  try {
    const formData = await Astro.request.formData();
    const concept = formData.get('concept')?.toString();
    const subject = formData.get('subject')?.toString() || 'Umum';
    const gradeLevel = formData.get('gradeLevel')?.toString() || 'SMA';
    const stepCount = parseInt(formData.get('stepCount')?.toString() || '4', 10);

    // Panggil Endpoint Internal Gemini API
    const response = await fetch(new URL('/api/generate', Astro.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept, subject, gradeLevel, stepCount }),
    });

    const result = await response.json();
    if (result.data) {
      infographicData = result.data;
    } else {
      error = result.error || 'Gagal menghasilkan data infografis';
    }
  } catch (err: any) {
    error = err.message;
  }
}
---

<Layout title="InfoBimbel MusafirONE - Generator Infografis Edukasi">
  <main class="max-w-7xl mx-auto px-4 py-8">
    <header class="text-center mb-8">
      <div class="flex items-center justify-center gap-3 mb-2">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=MusafirONE" alt="MusafirONE Logo" class="w-12 h-12 rounded-xl" />
        <h1 class="text-3xl font-black text-slate-900">InfoBimbel MusafirONE</h1>
      </div>
      <p class="text-slate-600 text-sm">Visualisasi Konsep Belajar Bertenaga AI Gemini 3.7</p>
    </header>

    <!-- FORM INPUT -->
    <div class="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-10">
      <form method="POST" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Konsep / Pelajaran yang Ingin Dipelajari:
          </label>
          <input
            type="text"
            name="concept"
            placeholder="Contoh: Proses Fotosintesis, Hukum Newton..."
            required
            class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Mata Pelajaran</label>
            <select name="subject" class="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="Biologi">Biologi</option>
              <option value="Fisika">Fisika</option>
              <option value="Kimia">Kimia</option>
              <option value="Matematika">Matematika</option>
              <option value="Sejarah">Sejarah</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Jenjang</label>
            <select name="gradeLevel" class="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="SMP">SMP</option>
              <option value="SMA" selected>SMA</option>
              <option value="Kuliah / Umum">Kuliah / Umum</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Jumlah Langkah</label>
            <select name="stepCount" class="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="3">3 Langkah</option>
              <option value="4" selected>4 Langkah</option>
              <option value="5">5 Langkah</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition"
        >
          🚀 Generate Poster Infografis
        </button>
      </form>
    </div>

    <!-- HASIL POSTER INFOGRAFIS -->
    {infographicData && (
      <section class="mt-8">
        <InfographicPoster data={infographicData} />
      </section>
    )}

    <!-- FOOTER RESMI -->
    <footer class="mt-16 pt-8 border-t text-center text-xs text-slate-500">
      <p>InfoBimbel MusafirONE • Developer by <strong class="text-emerald-600">@wargaminiofficial</strong></p>
    </footer>
  </main>
</Layout>`,
    },
    api: {
      filename: 'src/pages/api/generate.ts',
      lang: 'typescript',
      description: 'Cloudflare Workers Endpoint (Astro SSR) yang memanggil Gemini API via @google/genai',
      code: `// src/pages/api/generate.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI, Type } from '@google/genai';

export const prerender = false; // Memastikan endpoint berjalan di Cloudflare SSR

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { concept, subject = 'Umum', gradeLevel = 'SMA', stepCount = 4 } = body;

    // Baca Gemini API Key dari Environment Variable Cloudflare
    // (Bisa diakses melalui runtime locals / process.env)
    const apiKey = (locals as any)?.runtime?.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY belum dikonfigurasi di Cloudflare.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const prompt = \`Anda adalah pakar pembuat infografis edukasi untuk InfoBimbel MusafirONE.
Pecah konsep "\${concept}" (\${subject}, jenjang: \${gradeLevel}) menjadi tepat \${stepCount} langkah visual berurutan dengan judul, deskripsi padat (2-3 kalimat), rekomendasi nama icon, rumus/istilah kunci, badge, analogi visual, dan fakta unik.\`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptTitle: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            gradeLevel: { type: Type.STRING },
            summaryQuote: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  shortDesc: { type: Type.STRING },
                  keyFormulaOrSnippet: { type: Type.STRING },
                  iconName: { type: Type.STRING },
                  colorAccent: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  visualTip: { type: Type.STRING },
                },
                required: ['stepNumber', 'title', 'shortDesc', 'keyFormulaOrSnippet', 'iconName', 'badge', 'visualTip'],
              },
            },
            funFactOrTip: { type: Type.STRING },
          },
          required: ['conceptTitle', 'subtitle', 'subject', 'gradeLevel', 'summaryQuote', 'steps', 'funFactOrTip'],
        },
      },
    });

    const data = JSON.parse(response.text || '{}');
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};`,
    },
    component: {
      filename: 'src/components/InfographicPoster.astro',
      lang: 'astro',
      description: 'Komponen Poster Presentasi Infografis Siap Cetak (HTML + Tailwind CSS)',
      code: `---
// src/components/InfographicPoster.astro
interface Props {
  data: {
    conceptTitle: string;
    subtitle: string;
    subject: string;
    gradeLevel: string;
    summaryQuote: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      shortDesc: string;
      keyFormulaOrSnippet: string;
      iconName: string;
      badge: string;
      visualTip: string;
    }>;
    funFactOrTip: string;
  };
}

const { data } = Astro.props;
---

<div class="max-w-4xl mx-auto bg-slate-950 text-white rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10 font-sans">
  <!-- POSTER HEADER -->
  <header class="border-b border-slate-800 pb-6 mb-8">
    <div class="flex items-center justify-between gap-4 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center font-black text-slate-950">
          M1
        </div>
        <div>
          <span class="text-xs font-black tracking-wider uppercase text-emerald-400">InfoBimbel MusafirONE</span>
          <span class="block text-[11px] text-slate-400">Poster Pembelajaran Visual Siap Cetak</span>
        </div>
      </div>
      <div class="flex gap-2">
        <span class="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{data.subject}</span>
        <span class="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 border border-slate-700">{data.gradeLevel}</span>
      </div>
    </div>

    <h1 class="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">{data.conceptTitle}</h1>
    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">{data.subtitle}</p>

    {data.summaryQuote && (
      <div class="mt-4 p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono">
        <strong>Rumus Kunci:</strong> {data.summaryQuote}
      </div>
    )}
  </header>

  <!-- TIMELINE ROADMAP -->
  <div class="relative pl-8 space-y-8 my-8">
    <div class="absolute left-3 top-4 bottom-4 w-1 bg-emerald-500/30 rounded-full"></div>

    {data.steps.map((step) => (
      <div class="relative">
        <div class="absolute -left-8 top-3 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-lg">
          {step.stepNumber}
        </div>
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {step.badge}
            </span>
            <span class="text-xs font-mono text-cyan-300 bg-slate-800 px-2.5 py-1 rounded-lg">
              {step.keyFormulaOrSnippet}
            </span>
          </div>
          <h3 class="text-lg font-bold text-white">{step.title}</h3>
          <p class="text-slate-300 text-sm leading-relaxed">{step.shortDesc}</p>
          <div class="text-xs text-slate-400 pt-2 border-t border-slate-800">
            💡 <strong>Visualisasi:</strong> {step.visualTip}
          </div>
        </div>
      </div>
    ))}
  </div>

  <!-- FUN FACT & FOOTER -->
  <div class="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm">
    <strong>💡 Tips Ingat Cepat:</strong> {data.funFactOrTip}
  </div>

  <footer class="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
    <span>InfoBimbel MusafirONE • Edukasi Visual Masa Depan</span>
    <span class="text-emerald-400 font-bold">Developer by @wargaminiofficial</span>
  </footer>
</div>`,
    },
    config: {
      filename: 'astro.config.mjs',
      lang: 'javascript',
      description: 'Konfigurasi Astro.js untuk Cloudflare Workers SSR + Tailwind CSS',
      code: `import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [tailwind()],
});`,
    },
    wrangler: {
      filename: 'wrangler.toml',
      lang: 'toml',
      description: 'Konfigurasi Deployment Cloudflare Workers',
      code: `name = "infobimbel-musafirone"
main = "./dist/_worker.js"
compatibility_date = "2024-04-01"
compatibility_flags = ["nodejs_compat"]

[vars]
GEMINI_API_KEY = "MASUKKAN_GEMINI_API_KEY_DI_SINI"`,
    },
  };

  const currentFile = files[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-4 border-teal-500 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[12px_12px_0px_0px_rgba(13,148,136,1)] text-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b-2 border-teal-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-100 text-teal-800 border-2 border-teal-600 shadow-[2px_2px_0px_0px_rgba(13,148,136,1)]">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Susunan Kode Astro.js (Cloudflare Workers)
              </h3>
              <p className="text-xs font-semibold text-teal-300">
                InfoBimbel MusafirONE • Turnkey Production Setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition flex items-center justify-center font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pt-3 bg-slate-950 border-b border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'index', label: 'src/pages/index.astro' },
              { id: 'api', label: 'src/pages/api/generate.ts' },
              { id: 'component', label: 'InfographicPoster.astro' },
              { id: 'config', label: 'astro.config.mjs' },
              { id: 'wrangler', label: 'wrangler.toml' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl border-t-2 border-x-2 transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 border-teal-500 text-teal-300 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* File Description & Copy Header */}
        <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">{currentFile.description}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black shadow-[2px_2px_0px_0px_rgba(17,94,89,1)] active:translate-y-0.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
          </button>
        </div>

        {/* Code Content Box */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="overflow-x-auto">
            <code>{currentFile.code}</code>
          </pre>
        </div>

        {/* Modal Footer Note */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>
            Deploy ke Cloudflare: Jalankan <code className="text-teal-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-700">npx wrangler deploy</code>
          </span>
          <span className="font-bold text-rose-400">Developer by @wargaminiofficial</span>
        </div>
      </div>
    </div>
  );
};
