import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  // Normalize name
  const cleanName = name?.replace(/[^a-zA-Z0-9]/g, '') || '';
  
  // Icon dictionary alias fallback
  const iconAliases: Record<string, keyof typeof LucideIcons> = {
    sun: 'Sun',
    leaf: 'Leaf',
    zap: 'Zap',
    droplet: 'Droplets',
    droplets: 'Droplets',
    water: 'Droplets',
    atom: 'Atom',
    dna: 'Dna',
    flask: 'FlaskConical',
    flaskconical: 'FlaskConical',
    compass: 'Compass',
    sparkle: 'Sparkles',
    sparkles: 'Sparkles',
    activity: 'Activity',
    pulse: 'Activity',
    shield: 'ShieldCheck',
    shieldcheck: 'ShieldCheck',
    rocket: 'Rocket',
    heart: 'HeartPulse',
    heartpulse: 'HeartPulse',
    scale: 'Scale',
    layers: 'Layers',
    layer: 'Layers',
    brain: 'BrainCircuit',
    braincircuit: 'BrainCircuit',
    cpu: 'Cpu',
    binary: 'Binary',
    magnet: 'Magnet',
    flame: 'Flame',
    fire: 'Flame',
    wind: 'Wind',
    globe: 'Globe',
    eye: 'Eye',
    check: 'CheckCircle2',
    checkcircle: 'CheckCircle2',
    target: 'Target',
    microscope: 'Microscope',
    book: 'BookOpen',
    lightbulb: 'Lightbulb',
    calculator: 'Calculator',
    wrench: 'Wrench',
  };

  const lookupKey = cleanName.toLowerCase();
  const matchedKey = iconAliases[lookupKey] || (cleanName as keyof typeof LucideIcons);
  
  const IconComponent = (LucideIcons[matchedKey] as React.ComponentType<any>) || LucideIcons.Sparkles;

  return <IconComponent className={className} size={size} />;
};
