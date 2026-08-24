import React from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Quote,
  Lightbulb,
  QrCode,
  CheckCircle2,
  Bookmark,
  ArrowDown,
  Layers,
  Edit3,
} from 'lucide-react';
import { InfographicData, PosterTheme, PosterLayout, AspectRatioPreset, InfographicStep } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface InfographicPosterProps {
  data: InfographicData;
  theme: PosterTheme;
  layout: PosterLayout;
  aspectRatio: AspectRatioPreset;
  avatarUrl: string;
  onUpdateStepText?: (stepId: string, field: keyof InfographicStep, value: string) => void;
  onUpdateDataField?: (field: keyof InfographicData, value: string) => void;
}

export const InfographicPoster: React.FC<InfographicPosterProps> = ({
  data,
  theme,
  layout,
  aspectRatio,
  avatarUrl,
  onUpdateStepText,
  onUpdateDataField,
}) => {
  // Theme Styles Dictionary
  const themeStyles = {
    vibrant: {
      container: 'bg-white text-slate-900 border-4 border-rose-500 rounded-[36px] shadow-[12px_12px_0px_0px_rgba(225,29,72,1)]',
      headerBg: 'bg-white border-b-2 border-dashed border-rose-200',
      badgeBg: 'bg-teal-100 text-teal-800 border-2 border-teal-600 font-black',
      quoteBg: 'bg-amber-100 border-2 border-amber-400 text-amber-950 font-bold shadow-[2px_2px_0px_0px_rgba(217,119,6,0.6)]',
      cardBg: 'bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5',
      stepNumBg: 'bg-amber-400 text-slate-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
      lineColor: 'bg-rose-400',
      funFactBg: 'bg-teal-50 border-2 border-teal-500 text-teal-950 font-medium shadow-[2px_2px_0px_0px_rgba(13,148,136,0.4)]',
      footerBg: 'bg-teal-50/80 border-t-2 border-teal-200 text-teal-950',
      accentText: 'text-rose-600',
      fontHeading: 'font-sans font-black uppercase tracking-wider text-rose-600',
    },
    modern: {
      container: 'bg-slate-950 text-slate-100 border-slate-800 shadow-2xl',
      headerBg: 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      quoteBg: 'bg-slate-900/80 border-slate-800 text-emerald-300',
      cardBg: 'bg-slate-900/90 border-slate-800 hover:border-slate-700',
      stepNumBg: 'bg-emerald-500 text-slate-950 font-bold',
      lineColor: 'bg-emerald-500/30',
      funFactBg: 'bg-slate-900/90 border-amber-500/30 text-amber-200',
      footerBg: 'bg-slate-900/80 border-t border-slate-800',
      accentText: 'text-emerald-400',
      fontHeading: 'font-sans font-black',
    },
    blueprint: {
      container: 'bg-[#0a192f] text-cyan-50 border-cyan-800/60 shadow-2xl blueprint-grid',
      headerBg: 'bg-[#0f2744]/80 border-b border-cyan-700/50',
      badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
      quoteBg: 'bg-[#0f2744]/90 border-cyan-500/40 text-cyan-300 font-mono',
      cardBg: 'bg-[#0f2744]/70 border-cyan-800/80 hover:border-cyan-500/60',
      stepNumBg: 'bg-cyan-400 text-slate-950 font-mono font-bold',
      lineColor: 'bg-cyan-500/40',
      funFactBg: 'bg-[#0f2744]/90 border-cyan-400/50 text-cyan-100',
      footerBg: 'bg-[#081326] border-t border-cyan-800/50',
      accentText: 'text-cyan-400',
      fontHeading: 'font-mono font-bold tracking-tight',
    },
    editorial: {
      container: 'bg-[#FDFBF7] text-[#2C241D] border-[#E3DAC9] shadow-2xl',
      headerBg: 'bg-[#F4EFE6] border-b border-[#E3DAC9]',
      badgeBg: 'bg-[#EADBC8] text-[#6E473B] border-[#D1BFA8]',
      quoteBg: 'bg-[#F7F2EA] border-[#D1BFA8] text-[#8C4A2F] italic',
      cardBg: 'bg-white border-[#E8E1D5] hover:border-[#D1BFA8]',
      stepNumBg: 'bg-[#8C4A2F] text-white font-bold',
      lineColor: 'bg-[#D1BFA8]',
      funFactBg: 'bg-[#FFF8EE] border-[#E8C596] text-[#7A4B1A]',
      footerBg: 'bg-[#F4EFE6] border-t border-[#E3DAC9]',
      accentText: 'text-[#8C4A2F]',
      fontHeading: 'font-serif font-black',
    },
    pastel: {
      container: 'bg-[#FAF8FF] text-slate-800 border-purple-200 shadow-2xl',
      headerBg: 'bg-gradient-to-r from-purple-100/80 via-pink-50/80 to-blue-50/80 border-b border-purple-200',
      badgeBg: 'bg-purple-200/70 text-purple-800 border-purple-300',
      quoteBg: 'bg-white/90 border-purple-200 text-purple-900',
      cardBg: 'bg-white/95 border-purple-150 hover:border-purple-300 shadow-sm',
      stepNumBg: 'bg-purple-600 text-white font-bold',
      lineColor: 'bg-purple-300',
      funFactBg: 'bg-amber-50/90 border-amber-200 text-amber-900',
      footerBg: 'bg-purple-100/50 border-t border-purple-200',
      accentText: 'text-purple-600',
      fontHeading: 'font-sans font-bold',
    },
    cyberpunk: {
      container: 'bg-[#0B0914] text-slate-100 border-fuchsia-900/60 shadow-2xl',
      headerBg: 'bg-[#130E26]/90 border-b border-fuchsia-800/40',
      badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
      quoteBg: 'bg-[#160F2E] border-cyan-500/50 text-cyan-300 font-mono',
      cardBg: 'bg-[#150F2B]/80 border-fuchsia-900/50 hover:border-cyan-500/50',
      stepNumBg: 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-slate-950 font-black',
      lineColor: 'bg-gradient-to-b from-fuchsia-500 to-cyan-400',
      funFactBg: 'bg-[#1A1235] border-yellow-400/40 text-yellow-200',
      footerBg: 'bg-[#0D071C] border-t border-fuchsia-900/40',
      accentText: 'text-cyan-400',
      fontHeading: 'font-sans font-black tracking-tight',
    },
    forest: {
      container: 'bg-[#071E18] text-emerald-50 border-emerald-900 shadow-2xl',
      headerBg: 'bg-[#0B2A22]/90 border-b border-emerald-800/50',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      quoteBg: 'bg-[#0C3027] border-emerald-700/50 text-emerald-200',
      cardBg: 'bg-[#0A261F]/80 border-emerald-800/60 hover:border-emerald-500/50',
      stepNumBg: 'bg-emerald-400 text-slate-950 font-bold',
      lineColor: 'bg-emerald-600/40',
      funFactBg: 'bg-[#0C3027] border-amber-400/30 text-amber-200',
      footerBg: 'bg-[#051813] border-t border-emerald-900',
      accentText: 'text-emerald-400',
      fontHeading: 'font-sans font-black',
    },
    monochrome: {
      container: 'bg-white text-zinc-950 border-zinc-300 shadow-2xl',
      headerBg: 'bg-zinc-100 border-b border-zinc-300',
      badgeBg: 'bg-zinc-200 text-zinc-900 border-zinc-400',
      quoteBg: 'bg-zinc-50 border-zinc-900 text-zinc-900 font-mono',
      cardBg: 'bg-white border-zinc-300 hover:border-zinc-900 shadow-sm',
      stepNumBg: 'bg-zinc-950 text-white font-bold',
      lineColor: 'bg-zinc-400',
      funFactBg: 'bg-zinc-100 border-zinc-400 text-zinc-900',
      footerBg: 'bg-zinc-100 border-t border-zinc-300',
      accentText: 'text-zinc-900 font-bold',
      fontHeading: 'font-sans font-black',
    },
    sunset: {
      container: 'bg-[#1C0F1B] text-rose-50 border-rose-950 shadow-2xl',
      headerBg: 'bg-[#291427]/90 border-b border-rose-900/50',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      quoteBg: 'bg-[#2E162B] border-amber-500/40 text-amber-200',
      cardBg: 'bg-[#261324]/80 border-rose-900/40 hover:border-amber-400/50',
      stepNumBg: 'bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold',
      lineColor: 'bg-rose-500/30',
      funFactBg: 'bg-[#2D162B] border-amber-400/40 text-amber-100',
      footerBg: 'bg-[#140A13] border-t border-rose-950',
      accentText: 'text-amber-400',
      fontHeading: 'font-sans font-black',
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.modern;

  // Aspect ratio container classes
  const aspectClasses = {
    a4: 'w-full max-w-4xl min-h-[1100px]',
    story: 'w-full max-w-xl min-h-[1050px]',
    landscape: 'w-full max-w-5xl min-h-[850px]',
    square: 'w-full max-w-3xl min-h-[900px]',
  };

  // Color accents for steps
  const getStepAccent = (color: string) => {
    if (theme === 'vibrant') {
      switch (color) {
        case 'emerald':
          return {
            badge: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600 font-bold',
            iconBg: 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-emerald-50 text-emerald-950 border-2 border-emerald-500 font-bold',
            border: 'hover:border-emerald-600',
          };
        case 'blue':
          return {
            badge: 'bg-blue-100 text-blue-900 border-2 border-blue-600 font-bold',
            iconBg: 'bg-blue-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-blue-50 text-blue-950 border-2 border-blue-500 font-bold',
            border: 'hover:border-blue-600',
          };
        case 'amber':
          return {
            badge: 'bg-amber-100 text-amber-950 border-2 border-amber-500 font-bold',
            iconBg: 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-amber-50 text-amber-950 border-2 border-amber-500 font-bold',
            border: 'hover:border-amber-600',
          };
        case 'purple':
        case 'indigo':
          return {
            badge: 'bg-purple-100 text-purple-950 border-2 border-purple-500 font-bold',
            iconBg: 'bg-purple-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-purple-50 text-purple-950 border-2 border-purple-500 font-bold',
            border: 'hover:border-purple-600',
          };
        case 'rose':
          return {
            badge: 'bg-rose-100 text-rose-950 border-2 border-rose-500 font-bold',
            iconBg: 'bg-rose-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-rose-50 text-rose-950 border-2 border-rose-500 font-bold',
            border: 'hover:border-rose-600',
          };
        case 'cyan':
        default:
          return {
            badge: 'bg-teal-100 text-teal-950 border-2 border-teal-600 font-bold',
            iconBg: 'bg-teal-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            pill: 'bg-teal-50 text-teal-950 border-2 border-teal-500 font-bold',
            border: 'hover:border-teal-600',
          };
      }
    }

    switch (color) {
      case 'emerald':
        return {
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          border: 'hover:border-emerald-500/50',
        };
      case 'blue':
        return {
          badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
          border: 'hover:border-blue-500/50',
        };
      case 'amber':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          pill: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          border: 'hover:border-amber-500/50',
        };
      case 'purple':
      case 'indigo':
        return {
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          border: 'hover:border-purple-500/50',
        };
      case 'rose':
        return {
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          pill: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          border: 'hover:border-rose-500/50',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
          pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          border: 'hover:border-cyan-500/50',
        };
      default:
        return {
          badge: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
          iconBg: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
          pill: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
          border: 'hover:border-teal-500/50',
        };
    }
  };

  return (
    <div className="flex justify-center p-2 sm:p-4">
      {/* Poster Canvas */}
      <div
        id="printable-infographic-poster"
        className={`${aspectClasses[aspectRatio]} ${currentTheme.container} rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between print:m-0 print:border-none print:shadow-none print:w-full print:max-w-none`}
      >
        {/* TOP POSTER HEADER */}
        <div className={`p-6 sm:p-8 ${currentTheme.headerBg} relative`}>
          {/* Top InfoBar with MusafirONE Branding & Meta */}
          <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            {/* MusafirONE Profile Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="MusafirONE"
                    className="w-full h-full object-cover rounded-[10px]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-emerald-400 text-xs">
                    M1
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-wider uppercase opacity-90">
                    InfoBimbel MusafirONE
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${currentTheme.badgeBg}`}>
                    Poster Pembelajaran Visual
                  </span>
                </div>
                <div className="text-[11px] opacity-75">
                  Seri Infografis Konsep Akademis Cepat Tangkap
                </div>
              </div>
            </div>

            {/* Badges: Subject & Level */}
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 text-xs rounded-lg border font-medium flex items-center gap-1 ${currentTheme.badgeBg}`}>
                <BookOpen className="w-3 h-3" />
                {data.subject}
              </span>
              <span className={`hidden sm:inline-flex px-2.5 py-1 text-xs rounded-lg border font-medium items-center gap-1 ${currentTheme.badgeBg}`}>
                <GraduationCap className="w-3 h-3" />
                {data.gradeLevel}
              </span>
            </div>
          </div>

          {/* Large Concept Title */}
          <div className="space-y-2">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl ${currentTheme.fontHeading} tracking-tight leading-tight`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdateDataField?.('conceptTitle', e.currentTarget.textContent || '')}
              title="Klik untuk mengedit judul langsung"
            >
              {data.conceptTitle}
            </h1>
            <p
              className="text-sm sm:text-base opacity-85 leading-relaxed max-w-3xl"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdateDataField?.('subtitle', e.currentTarget.textContent || '')}
              title="Klik untuk mengedit subjudul langsung"
            >
              {data.subtitle}
            </p>
          </div>

          {/* Key Formula / Principle Quote Banner */}
          {data.summaryQuote && (
            <div className={`mt-4 p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 ${currentTheme.quoteBg}`}>
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <Quote className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wide flex-1">
                <span className="opacity-70 text-[11px] uppercase tracking-wider block mb-0.5">
                  Rumus Kunci / Prinsip Inti:
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdateDataField?.('summaryQuote', e.currentTarget.textContent || '')}
                >
                  {data.summaryQuote}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* POSTER MAIN CONTENT BODY */}
        <div className="p-6 sm:p-8 flex-1">
          {/* LAYOUT: TIMELINE ROADMAP */}
          {layout === 'timeline' && (
            <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8">
              {/* Connecting vertical line */}
              <div
                className={`absolute left-3 sm:left-5 top-4 bottom-4 w-1 rounded-full ${currentTheme.lineColor}`}
              ></div>

              {data.steps.map((step, idx) => {
                const accent = getStepAccent(step.colorAccent);
                return (
                  <div key={step.id || idx} className="relative group">
                    {/* Node Circle on Line */}
                    <div
                      className={`absolute -left-6 sm:-left-10 top-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full ${currentTheme.stepNumBg} flex items-center justify-center text-xs sm:text-sm shadow-lg ring-4 ring-slate-950/40 z-10`}
                    >
                      {step.stepNumber || idx + 1}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border ${currentTheme.cardBg} ${accent.border} transition duration-200 shadow-md space-y-3`}
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2.5 rounded-xl border ${accent.iconBg}`}>
                            <DynamicIcon name={step.iconName} className="w-5 h-5" />
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border mb-1 ${accent.badge}`}>
                              {step.badge}
                            </span>
                            <h3
                              className="text-base sm:text-lg font-bold leading-tight"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => onUpdateStepText?.(step.id, 'title', e.currentTarget.textContent || '')}
                            >
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {/* Formula snippet pill */}
                        {step.keyFormulaOrSnippet && (
                          <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${accent.pill}`}>
                            {step.keyFormulaOrSnippet}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className="text-xs sm:text-sm leading-relaxed opacity-90"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateStepText?.(step.id, 'shortDesc', e.currentTarget.textContent || '')}
                      >
                        {step.shortDesc}
                      </p>

                      {/* Visual Tip */}
                      {step.visualTip && (
                        <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-[11px] opacity-75">
                          <span className="font-semibold text-emerald-400 shrink-0">💡 Analogi Visual:</span>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => onUpdateStepText?.(step.id, 'visualTip', e.currentTarget.textContent || '')}
                          >
                            {step.visualTip}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LAYOUT: BENTO GRID */}
          {layout === 'bento' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {data.steps.map((step, idx) => {
                const accent = getStepAccent(step.colorAccent);
                const isFeatured = idx === 0 && data.steps.length % 2 !== 0;
                return (
                  <div
                    key={step.id || idx}
                    className={`p-5 rounded-2xl border ${currentTheme.cardBg} ${accent.border} transition duration-200 shadow-md flex flex-col justify-between space-y-3 ${
                      isFeatured ? 'md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-850' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg ${currentTheme.stepNumBg} flex items-center justify-center text-xs font-bold`}>
                            {step.stepNumber || idx + 1}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${accent.badge}`}>
                            {step.badge}
                          </span>
                        </div>
                        <div className={`p-2 rounded-xl border ${accent.iconBg}`}>
                          <DynamicIcon name={step.iconName} className="w-4 h-4" />
                        </div>
                      </div>

                      <h3
                        className="text-base sm:text-lg font-bold mb-2 leading-tight"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateStepText?.(step.id, 'title', e.currentTarget.textContent || '')}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm leading-relaxed opacity-90 mb-3"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateStepText?.(step.id, 'shortDesc', e.currentTarget.textContent || '')}
                      >
                        {step.shortDesc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {step.keyFormulaOrSnippet && (
                        <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${accent.pill}`}>
                          {step.keyFormulaOrSnippet}
                        </div>
                      )}
                      {step.visualTip && (
                        <div className="text-[11px] opacity-75 italic">
                          💡 {step.visualTip}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LAYOUT: PROCESS FLOW */}
          {layout === 'process' && (
            <div className="space-y-4">
              {data.steps.map((step, idx) => {
                const accent = getStepAccent(step.colorAccent);
                return (
                  <React.Fragment key={step.id || idx}>
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border ${currentTheme.cardBg} ${accent.border} shadow-md transition space-y-2`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${currentTheme.stepNumBg} flex items-center justify-center text-sm font-bold shadow`}>
                            {step.stepNumber || idx + 1}
                          </div>
                          <div className={`p-2 rounded-xl border ${accent.iconBg}`}>
                            <DynamicIcon name={step.iconName} className="w-4 h-4" />
                          </div>
                          <div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${accent.badge} px-2 py-0.5 rounded border`}>
                              {step.badge}
                            </span>
                            <h3
                              className="text-base font-bold leading-tight mt-0.5"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => onUpdateStepText?.(step.id, 'title', e.currentTarget.textContent || '')}
                            >
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {step.keyFormulaOrSnippet && (
                          <span className={`hidden sm:inline-block px-3 py-1 rounded-lg border text-xs font-mono font-semibold ${accent.pill}`}>
                            {step.keyFormulaOrSnippet}
                          </span>
                        )}
                      </div>

                      <p
                        className="text-xs sm:text-sm leading-relaxed opacity-90 pl-11"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateStepText?.(step.id, 'shortDesc', e.currentTarget.textContent || '')}
                      >
                        {step.shortDesc}
                      </p>

                      {step.visualTip && (
                        <div className="pl-11 text-[11px] opacity-75">
                          💡 <span className="font-semibold">Visual:</span> {step.visualTip}
                        </div>
                      )}
                    </div>

                    {/* Arrow down connector between process steps */}
                    {idx < data.steps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div className={`p-1 rounded-full ${currentTheme.lineColor} text-white opacity-80`}>
                          <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* LAYOUT: MODULAR CARDS */}
          {layout === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {data.steps.map((step, idx) => {
                const accent = getStepAccent(step.colorAccent);
                return (
                  <div
                    key={step.id || idx}
                    className={`p-5 rounded-2xl border ${currentTheme.cardBg} ${accent.border} shadow-md flex flex-col justify-between space-y-4`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-2xl border ${accent.iconBg} shadow-sm`}>
                          <DynamicIcon name={step.iconName} className="w-6 h-6" />
                        </div>
                        <span className={`w-8 h-8 rounded-xl ${currentTheme.stepNumBg} flex items-center justify-center text-sm font-black shadow`}>
                          0{step.stepNumber || idx + 1}
                        </span>
                      </div>

                      <div>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider ${accent.badge} px-2 py-0.5 rounded border mb-1`}>
                          {step.badge}
                        </span>
                        <h3
                          className="text-lg font-bold leading-tight"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => onUpdateStepText?.(step.id, 'title', e.currentTarget.textContent || '')}
                        >
                          {step.title}
                        </h3>
                      </div>

                      <p
                        className="text-xs sm:text-sm leading-relaxed opacity-90"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateStepText?.(step.id, 'shortDesc', e.currentTarget.textContent || '')}
                      >
                        {step.shortDesc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {step.keyFormulaOrSnippet && (
                        <div className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold ${accent.pill}`}>
                          {step.keyFormulaOrSnippet}
                        </div>
                      )}
                      {step.visualTip && (
                        <div className="text-[11px] opacity-75">
                          💡 {step.visualTip}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LOWER PEDAGOGICAL SECTION (Fun fact + Vocabulary glossary) */}
          <div className="mt-8 space-y-4">
            {/* Fun Fact / Tips Cepat Ingat Box */}
            {data.funFactOrTip && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${currentTheme.funFactBg}`}>
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold uppercase tracking-wider text-[11px] block mb-0.5">
                    💡 Tips Ingat Cepat / Fakta Unik:
                  </span>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdateDataField?.('funFactOrTip', e.currentTarget.textContent || '')}
                  >
                    {data.funFactOrTip}
                  </p>
                </div>
              </div>
            )}

            {/* Glossary Term Chips */}
            {data.vocabulary && data.vocabulary.length > 0 && (
              <div className="p-4 rounded-xl border bg-black/20 border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-80">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-400" /> Glosarium Istilah Kunci:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {data.vocabulary.map((vocab, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1">
                      <div className="font-bold text-emerald-400">{vocab.term}</div>
                      <div className="text-[11px] opacity-80 leading-snug">{vocab.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM POSTER FOOTER / BRANDING STAMP */}
        <div className={`p-5 sm:p-6 ${currentTheme.footerBg} flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-90`}>
          {/* Logo & Official MusafirONE Verification */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 p-0.5 flex items-center justify-center shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="MusafirONE"
                  className="w-full h-full object-cover rounded-[6px]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-bold text-slate-950 text-xs">M1</span>
              )}
            </div>
            <div>
              <div className="font-bold tracking-tight">
                InfoBimbel MusafirONE
              </div>
              <div className="text-[10px] opacity-75">
                Materi Terstruktur Siap Cetak • Dipublikasikan untuk Siswa & Guru
              </div>
            </div>
          </div>

          {/* Stamp & Developer Credit */}
          <div className="flex items-center gap-4 text-right">
            <div className="text-center sm:text-right">
              <div className="font-semibold text-emerald-400 text-[11px]">
                Developer by @wargaminiofficial
              </div>
              <div className="text-[10px] opacity-60">
                Edisi Standar Kurikulum Akademik • AI Visual Engine
              </div>
            </div>
            <div className="p-1.5 rounded-lg bg-white text-slate-950 shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
