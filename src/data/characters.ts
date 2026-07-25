export interface Character {
  id: string;
  name: string;
  role: string;
  avatarSvg: string; // inline SVG avatar graphic
  themeColor: string; // border/glow CSS color
  pitchOffset: number; // audio pitch for voice blip
}

export const CHARACTERS: Record<string, Character> = {
  vance: {
    id: 'vance',
    name: 'Commander Sarah Vance',
    role: 'Resistance High Command',
    themeColor: 'cyan',
    pitchOffset: 80,
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#06b6d4" stroke-width="3"/>
        <path d="M 30 75 C 30 55, 70 55, 70 75" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="50" cy="40" r="18" fill="#38bdf8"/>
        <!-- Hair & Eyepiece -->
        <path d="M 32 30 Q 50 15 68 30 C 65 20, 35 20, 32 30" fill="#0284c7"/>
        <rect x="52" y="36" width="14" height="6" rx="2" fill="#22d3ee"/>
        <line x1="50" y1="39" x2="66" y2="39" stroke="#67e8f9" stroke-width="1.5"/>
        <circle cx="40" cy="39" r="2.5" fill="#0f172a"/>
        <path d="M 45 48 Q 50 52 55 48" stroke="#0f172a" stroke-width="2" fill="none"/>
        <polygon points="50,10 56,20 44,20" fill="#06b6d4"/>
      </svg>
    `
  },
  jax: {
    id: 'jax',
    name: 'Jax "Byte" Miller',
    role: 'Lead Cybernetic Engineer',
    themeColor: 'amber',
    pitchOffset: -50,
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#f59e0b" stroke-width="3"/>
        <path d="M 28 78 C 28 58, 72 58, 72 78" fill="#451a03" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="50" cy="42" r="18" fill="#fbbf24"/>
        <!-- Goggles & Beard -->
        <rect x="34" y="34" width="32" height="10" rx="3" fill="#78350f" stroke="#fbbf24" stroke-width="1.5"/>
        <circle cx="42" cy="39" r="4" fill="#0f172a"/>
        <circle cx="42" cy="39" r="1.5" fill="#f59e0b"/>
        <circle cx="58" cy="39" r="4" fill="#0f172a"/>
        <circle cx="58" cy="39" r="1.5" fill="#f59e0b"/>
        <path d="M 38 48 C 38 60, 62 60, 62 48" fill="#92400e"/>
        <path d="M 45 52 Q 50 55 55 52" stroke="#fef3c7" stroke-width="1.5" fill="none"/>
      </svg>
    `
  },
  eva: {
    id: 'eva',
    name: 'E.V.A.',
    role: 'Tactical AI Companion',
    themeColor: 'emerald',
    pitchOffset: 120,
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#064e3b" stroke="#10b981" stroke-width="3"/>
        <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" fill="#022c22" stroke="#34d399" stroke-width="2"/>
        <circle cx="50" cy="50" r="15" fill="#10b981"/>
        <circle cx="50" cy="50" r="8" fill="#a7f3d0"/>
        <line x1="50" y1="15" x2="50" y2="35" stroke="#6ee7b7" stroke-width="2"/>
        <line x1="80" y1="50" x2="65" y2="50" stroke="#6ee7b7" stroke-width="2"/>
        <line x1="50" y1="85" x2="50" y2="65" stroke="#6ee7b7" stroke-width="2"/>
        <line x1="20" y1="50" x2="35" y2="50" stroke="#6ee7b7" stroke-width="2"/>
      </svg>
    `
  },
  omegaZero: {
    id: 'omegaZero',
    name: 'Omega-Zero',
    role: 'Robot Army AI Overlord',
    themeColor: 'rose',
    pitchOffset: -120,
    avatarSvg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#4c0519" stroke="#f43f5e" stroke-width="3"/>
        <rect x="25" y="25" width="50" height="50" rx="8" fill="#111827" stroke="#fb7185" stroke-width="2"/>
        <!-- Single Glowing Visor -->
        <rect x="30" y="42" width="40" height="8" rx="4" fill="#881337"/>
        <rect x="42" y="44" width="16" height="4" rx="2" fill="#f43f5e"/>
        <line x1="25" y1="35" x2="75" y2="35" stroke="#f43f5e" stroke-dasharray="2 2"/>
        <polygon points="50,60 40,70 60,70" fill="#f43f5e"/>
      </svg>
    `
  }
};
