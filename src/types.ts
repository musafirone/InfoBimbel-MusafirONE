export interface InfographicStep {
  id: string;
  stepNumber: number;
  title: string;
  shortDesc: string;
  keyFormulaOrSnippet: string;
  iconName: string;
  colorAccent: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'cyan' | 'indigo' | 'teal';
  badge: string;
  visualTip: string;
}

export interface VocabularyItem {
  term: string;
  definition: string;
}

export interface InfographicData {
  id: string;
  conceptTitle: string;
  subtitle: string;
  subject: string;
  gradeLevel: string;
  summaryQuote: string;
  steps: InfographicStep[];
  funFactOrTip: string;
  vocabulary: VocabularyItem[];
  createdAt: string;
}

export type PosterTheme = 
  | 'vibrant'     // Signature Vibrant Palette with Rose, Teal, Amber and Neo-brutalist pop cards
  | 'modern'      // Clean dark/light slate with sapphire & emerald accents
  | 'blueprint'   // Deep technical blueprint with cyan & grid lines
  | 'editorial'   // Warm cream editorial serif with terracotta accents
  | 'pastel'      // Soft mint, lilac and lemon academy vibe
  | 'cyberpunk'   // Neon violet and cyber lime high contrast
  | 'monochrome'  // Swiss minimalist editorial black & white
  | 'sunset'      // Coral, rose and amber warm glow
  | 'forest';     // Emerald, sage and deep forest scientific

export type PosterLayout = 
  | 'timeline'    // Vertical roadmap with connected nodes
  | 'bento'       // Modern asymmetric bento grid
  | 'process'     // Horizontal chevron/flow sequence
  | 'cards';      // Clean numbered cards with visual badges

export type AspectRatioPreset = 'a4' | 'story' | 'landscape' | 'square';

export interface GenerateRequestPayload {
  concept: string;
  subject?: string;
  gradeLevel?: string;
  stepCount?: number;
  language?: string;
  customNotes?: string;
}
