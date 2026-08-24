import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "InfoBimbel MusafirONE", timestamp: new Date().toISOString() });
  });

  // Gemini Infographic Generator API
  app.post("/api/generate-infographic", async (req, res) => {
    try {
      const {
        concept,
        subject = "Umum",
        gradeLevel = "SMA / Sederajat",
        stepCount = 4,
        customNotes = "",
      } = req.body;

      if (!concept || typeof concept !== "string" || concept.trim().length === 0) {
        return res.status(400).json({ error: "Konsep pelajaran wajib diisi" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not set. Using intelligent structured fallback.");
        const fallbackData = generateFallbackInfographic(concept, subject, gradeLevel, stepCount);
        return res.json({ data: fallbackData, isFallback: true });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Anda adalah kurator dan desainer infografis edukasi profesional untuk platform "InfoBimbel MusafirONE".
Tugas Anda adalah memecah konsep pelajaran berikut menjadi ${stepCount} langkah/elemen visual yang sangat jelas, padat, menarik, dan mudah dipahami siswa untuk dijadikan poster infografis belajar.

Topik Konsep: "${concept.trim()}"
Mata Pelajaran: ${subject}
Target Jenjang: ${gradeLevel}
${customNotes ? `Catatan Tambahan: ${customNotes}` : ""}

Instruksi Spesifik:
1. Buat judul konsep yang elegan dan resmi (conceptTitle).
2. Buat subjudul penjelas yang memikat dalam 1 kalimat (subtitle).
3. Buat kutipan ringkasan inti/rumus/prinsip utama (summaryQuote).
4. Buat tepat ${stepCount} langkah/fase terstruktur berurutan (steps). Tiap langkah harus memiliki:
   - title: Judul langkah singkat dan padat (2-5 kata).
   - shortDesc: Penjelasan esensial maksimal 2-3 kalimat yang sangat jelas dan mudah diingat.
   - keyFormulaOrSnippet: Rumus kunci, reaksi kimia, istilah latin, aturan ringkas, atau mnemonic singkatan memori.
   - iconName: Nama ikon Lucide / FontAwesome yang relevan (Pilihan: Sun, Leaf, Zap, Atom, FlaskConical, Dna, BrainCircuit, Droplets, Flame, Wind, Magnet, Globe, Compass, Activity, Eye, ShieldCheck, Target, CheckCircle2, Rocket, Sparkles, Scale, HeartPulse, Microscope, Cpu, Binary, Layers).
   - colorAccent: Pilih salah satu dari 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'cyan' | 'indigo' | 'teal'.
   - badge: Label fase singkat (contoh: "Fase 1: Absorpsi", "Hukum Inersia", "Glikolisis", "Reaksi Terang", dll).
   - visualTip: Metafora visual / bayangan diagram untuk memudahkan visualisasi siswa.
5. funFactOrTip: 1 fakta unik atau tips cara cepat menghafal konsep ini.
6. vocabulary: 2-3 istilah penting beserta definisinya secara ringkas.

Semua bahasa harus menggunakan Bahasa Indonesia yang komunikatif, baku, dan edukatif.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
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
                  required: ["stepNumber", "title", "shortDesc", "keyFormulaOrSnippet", "iconName", "colorAccent", "badge", "visualTip"],
                },
              },
              funFactOrTip: { type: Type.STRING },
              vocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ["term", "definition"],
                },
              },
            },
            required: ["conceptTitle", "subtitle", "subject", "gradeLevel", "summaryQuote", "steps", "funFactOrTip", "vocabulary"],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("Model did not return text");
      }

      const parsed = JSON.parse(text);
      // Ensure steps have unique IDs
      const stepsWithIds = (parsed.steps || []).map((s: any, idx: number) => ({
        ...s,
        id: `step-${idx + 1}-${Date.now()}`,
        stepNumber: s.stepNumber || idx + 1,
      }));

      const finalData = {
        ...parsed,
        id: `info-${Date.now()}`,
        steps: stepsWithIds,
        createdAt: new Date().toISOString(),
      };

      res.json({ data: finalData, isFallback: false });
    } catch (err: any) {
      console.error("Error generating infographic with Gemini:", err);
      // If error occurs, construct an intelligent fallback so user experience is smooth
      const fallbackData = generateFallbackInfographic(
        req.body?.concept || "Konsep Pelajaran",
        req.body?.subject || "Sains & Edukasi",
        req.body?.gradeLevel || "Umum",
        req.body?.stepCount || 4
      );
      res.json({
        data: fallbackData,
        isFallback: true,
        errorNote: err?.message || "Terjadi kendala jaringan AI, beralih ke mode cerdas lokal.",
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InfoBimbel MusafirONE server listening on http://0.0.0.0:${PORT}`);
  });
}

function generateFallbackInfographic(
  concept: string,
  subject: string,
  gradeLevel: string,
  stepCount: number = 4
) {
  const cLower = concept.toLowerCase();
  
  if (cLower.includes("foto") || cLower.includes("tumbuhan") || cLower.includes("daun")) {
    return {
      id: `fallback-${Date.now()}`,
      conceptTitle: "Proses Fotosintesis pada Tumbuhan Hijau",
      subtitle: "Transformasi Energi Cahaya Matahari Menjadi Energi Kimia Makanan",
      subject: subject || "Biologi",
      gradeLevel: gradeLevel || "SMP/SMA",
      summaryQuote: "6CO₂ + 6H₂O + Cahaya → C₆H₁₂O₆ (Glukosa) + 6O₂",
      steps: [
        {
          id: "step-1",
          stepNumber: 1,
          title: "Penyerapan Air & Karbon Dioksida",
          shortDesc: "Akar menyerap air (H₂O) dari dalam tanah melalui xilem, sementara stomata pada daun menyerap CO₂ dari udara bebas.",
          keyFormulaOrSnippet: "H₂O diserap akar • CO₂ diserap stomata",
          iconName: "Droplets",
          colorAccent: "blue",
          badge: "Fase Intake Bahan",
          visualTip: "Bayangkan pipa kapiler menyedot air tanah dan ventilasi daun menangkap gas udara.",
        },
        {
          id: "step-2",
          stepNumber: 2,
          title: "Reaksi Terang (Tilakoid)",
          shortDesc: "Klorofil dalam membran tilakoid menangkap foton cahaya matahari, memecah molekul air (fotolisis), dan menghasilkan ATP, NADPH, serta melepaskan oksigen.",
          keyFormulaOrSnippet: "Fotolisis: 2H₂O → 4H⁺ + 4e⁻ + O₂ ↑",
          iconName: "Sun",
          colorAccent: "amber",
          badge: "Fase Terang",
          visualTip: "Panel surya biologis memanen foton untuk mengecas 'baterai' ATP dan melepaskan O₂ ke udara.",
        },
        {
          id: "step-3",
          stepNumber: 3,
          title: "Siklus Calvin / Reaksi Gelap (Stroma)",
          shortDesc: "Terjadi di stroma kloroplas tanpa memerlukan cahaya langsung. Menggunakan energi ATP dan NADPH untuk mengikat CO₂ menjadi senyawa gula organik.",
          keyFormulaOrSnippet: "Fiksasi Karbon (Enzim RuBisCO) → Reduksi → Regenerasi RuBP",
          iconName: "Leaf",
          colorAccent: "emerald",
          badge: "Fase Gelap",
          visualTip: "Dapur kloroplas mengolah bahan mentah menjadi gula kaya kalori.",
        },
        {
          id: "step-4",
          stepNumber: 4,
          title: "Hasil & Distribusi Energi",
          shortDesc: "Glukosa diedarkan ke seluruh tubuh tumbuhan via floem sebagai cadangan makanan (amilum) dan oksigen dilepaskan untuk pernapasan makhluk hidup.",
          keyFormulaOrSnippet: "Hasil Utama: C₆H₁₂O₆ (Glukosa) & O₂ (Oksigen)",
          iconName: "Sparkles",
          colorAccent: "teal",
          badge: "Fase Output & Nutrisi",
          visualTip: "Sistem logistik mengantarkan energi ke pucuk daun, batang, dan buah.",
        },
      ],
      funFactOrTip: "Hampir 70% oksigen di bumi bukan dihasilkan dari hutan daratan, melainkan fitoplankton laut yang berfotosintesis!",
      vocabulary: [
        { term: "Kloroplas", definition: "Organel sel tumbuhan tempat terjadinya fotosintesis yang mengandung klorofil." },
        { term: "Fotolisis", definition: "Reaksi penguraian molekul air oleh energi cahaya pada reaksi terang." },
        { term: "Stoma / Stomata", definition: "Mulut daun tempat pertukaran gas oksigen dan karbon dioksida." },
      ],
      createdAt: new Date().toISOString(),
    };
  }

  // Default universal fallback
  return {
    id: `fallback-${Date.now()}`,
    conceptTitle: concept,
    subtitle: `Panduan Visual Terstruktur Pemahaman Konsep ${concept}`,
    subject: subject || "Sains & Edukasi",
    gradeLevel: gradeLevel || "SMA / Umum",
    summaryQuote: `Prinsip fundamental: Memahami esensi ${concept} melalui tahapan terpadu.`,
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Fondasi & Konseptualisasi Awal",
        shortDesc: `Mengenali variabel utama, definisi dasar, dan kondisi prasyarat yang melandasi fenomena ${concept}.`,
        keyFormulaOrSnippet: "Definisi Eksak • Variabel Kunci",
        iconName: "Compass",
        colorAccent: "blue",
        badge: "Tahap 1: Pengenalan",
        visualTip: "Fondasi kokoh sebagai pijakan pemahaman sistem.",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Mekanisme Inti & Interaksi",
        shortDesc: `Bagaimana komponen-komponen saling berinteraksi, mentransfer energi/informasi, dan memicu reaksi utama.`,
        keyFormulaOrSnippet: "Hukum Aksi • Transformasi Dinamis",
        iconName: "Zap",
        colorAccent: "amber",
        badge: "Tahap 2: Proses",
        visualTip: "Roda gigi yang saling terhubung dan menggerakkan proses.",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Reaksi, Kalkulasi & Implikasi",
        shortDesc: `Menganalisis hasil dari interaksi, rumus aplikatif, serta hukum kekekalan atau keteraturan yang terjadi.`,
        keyFormulaOrSnippet: "Persamaan Inti • Keseimbangan",
        iconName: "Atom",
        colorAccent: "purple",
        badge: "Tahap 3: Pembuktian",
        visualTip: "Pengukuran presisi dan manifestasi fenomena.",
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Aplikasi Nyata & Kesimpulan",
        shortDesc: `Penerapan konsep dalam teknologi, kehidupan sehari-hari, dan pemecahan masalah dunia nyata.`,
        keyFormulaOrSnippet: "Aplikasi Nyata • Output Bermanfaat",
        iconName: "Sparkles",
        colorAccent: "emerald",
        badge: "Tahap 4: Implementasi",
        visualTip: "Jembatan dari teori akademis menuju teknologi nyata.",
      },
    ].slice(0, Math.max(3, Math.min(5, stepCount))),
    funFactOrTip: `Konsep ${concept} merupakan salah satu topik yang sering keluar dalam ujian kompetensi dan olimpiade sains.`,
    vocabulary: [
      { term: "Prinsip Fundamental", definition: "Aturan baku yang selalu berlaku dalam sistem terkait." },
      { term: "Variabel Terikat", definition: "Faktor yang dipengaruhi oleh perubahan variabel bebas." },
    ],
    createdAt: new Date().toISOString(),
  };
}

startServer();
