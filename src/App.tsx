/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputPanel } from './components/InputPanel';
import { InfographicPoster } from './components/InfographicPoster';
import { PosterToolbar } from './components/PosterToolbar';
import { AstroCodeModal } from './components/AstroCodeModal';
import { SAMPLE_INFOGRAPHICS } from './data/presets';
import {
  InfographicData,
  PosterTheme,
  PosterLayout,
  AspectRatioPreset,
  GenerateRequestPayload,
  InfographicStep,
} from './types';
import { AlertCircle, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';

export default function App() {
  // Initial state uses the default 'fotosintesis' preset with 'vibrant' theme
  const [data, setData] = useState<InfographicData>(SAMPLE_INFOGRAPHICS.fotosintesis);
  const [theme, setTheme] = useState<PosterTheme>('vibrant');
  const [layout, setLayout] = useState<PosterLayout>('timeline');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>('a4');
  const [isLoading, setIsLoading] = useState(false);
  const [isAstroModalOpen, setIsAstroModalOpen] = useState(false);
  const [activePresetKey, setActivePresetKey] = useState<string>('fotosintesis');
  const [avatarUrl, setAvatarUrl] = useState<string>(
    'https://api.dicebear.com/7.x/bottts/svg?seed=MusafirONE'
  );
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSelectPreset = (key: string) => {
    if (SAMPLE_INFOGRAPHICS[key]) {
      setData(SAMPLE_INFOGRAPHICS[key]);
      setActivePresetKey(key);
      showToast('success', `Berhasil memuat preset: ${SAMPLE_INFOGRAPHICS[key].conceptTitle}`);
    }
  };

  const handleGenerate = async (payload: GenerateRequestPayload) => {
    setIsLoading(true);
    setActivePresetKey('');
    try {
      const response = await fetch('/api/generate-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.data) {
        setData(result.data);
        showToast(
          'success',
          `Poster "${result.data.conceptTitle}" berhasil di-generate!`
        );
        // Smooth scroll to poster view
        setTimeout(() => {
          document.getElementById('poster-toolbar-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else {
        throw new Error(result.error || 'Gagal menghasilkan infografis');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      showToast('error', err.message || 'Terjadi kesalahan saat memanggil Gemini AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateStepText = (stepId: string, field: keyof InfographicStep, value: string) => {
    setData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId ? { ...step, [field]: value } : step
      ),
    }));
  };

  const handleUpdateDataField = (field: keyof InfographicData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenAstroModal={() => setIsAstroModalOpen(true)}
        onSelectPreset={handleSelectPreset}
        activePresetKey={activePresetKey}
        onPrint={handlePrint}
        avatarUrl={avatarUrl}
        onUpdateAvatarUrl={(url) => {
          setAvatarUrl(url);
          showToast('success', 'Foto profil MusafirONE berhasil diperbarui!');
        }}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 flex items-center gap-3 text-xs sm:text-sm font-black ${
              notification.type === 'success'
                ? 'bg-emerald-100 border-emerald-600 text-emerald-950'
                : notification.type === 'error'
                ? 'bg-rose-100 border-rose-600 text-rose-950'
                : 'bg-white border-slate-900 text-slate-950'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* TOP INTRO HERO & INPUT STUDIO */}
        <section id="input-studio-section" className="no-print">
          <InputPanel
            onGenerate={handleGenerate}
            isLoading={isLoading}
            theme={theme}
            onThemeChange={setTheme}
            layout={layout}
            onLayoutChange={setLayout}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
          />
        </section>

        {/* POSTER DISPLAY & TOOLBAR SECTION */}
        <section id="poster-toolbar-section" className="space-y-6">
          <div className="no-print">
            <PosterToolbar
              data={data}
              onPrint={handlePrint}
              onOpenAstroModal={() => setIsAstroModalOpen(true)}
            />
          </div>

          {/* Master Infographic Poster */}
          <div className="w-full">
            <InfographicPoster
              data={data}
              theme={theme}
              layout={layout}
              aspectRatio={aspectRatio}
              avatarUrl={avatarUrl}
              onUpdateStepText={handleUpdateStepText}
              onUpdateDataField={handleUpdateDataField}
            />
          </div>
        </section>
      </main>

      {/* Astro.js Code & Cloudflare Workers Guide Modal */}
      <AstroCodeModal
        isOpen={isAstroModalOpen}
        onClose={() => setIsAstroModalOpen(false)}
      />

      {/* Main Layout Footer (Includes @wargaminiofficial) */}
      <Footer avatarUrl={avatarUrl} />
    </div>
  );
}
