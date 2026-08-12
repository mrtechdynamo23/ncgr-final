import React from 'react';

interface NCGRLogoProps {
  height?: number;
  className?: string;
  variant?: 'full' | 'icon-only' | 'white';
}

export const NCGRLogo: React.FC<NCGRLogoProps> = ({ height = 40, className = '', variant = 'full' }) => {
  if (variant === 'icon-only') {
    return (
      <svg
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Top Vertical Petal (Light Blue) */}
        <path d="M46 10 C46 10, 54 10, 54 28 L54 44 C54 44, 46 44, 46 36 Z" fill="#4AA6DC" />
        {/* Top-Right Petal (Teal) */}
        <path d="M54 28 C54 28, 60 22, 75 32 L88 40 C88 40, 80 46, 68 42 Z" fill="#1FBBB0" />
        {/* Bottom-Right Petal (Green/Lime) */}
        <path d="M68 42 C68 42, 74 48, 70 65 L66 78 C66 78, 58 72, 58 60 Z" fill="#7CB342" />
        {/* Bottom Vertical Petal (Purple) */}
        <path d="M54 56 C54 56, 46 56, 46 74 L46 90 C46 90, 54 90, 54 82 Z" fill="#671E75" />
        {/* Bottom-Left Petal (Dark Green) */}
        <path d="M46 72 C46 72, 40 78, 25 68 L12 60 C12 60, 20 54, 32 58 Z" fill="#40904F" />
        {/* Top-Left Petal (Cyan) */}
        <path d="M32 58 C32 58, 26 52, 30 35 L34 22 C34 22, 42 28, 42 40 Z" fill="#00ACC1" />
      </svg>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className={className}>
      {/* 6-petal Emblem */}
      <svg height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Petal 1: Top (Blue) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#38B6FF" transform="rotate(0 50 25)" />
        {/* Petal 2: Top Right (Light Blue/Cyan) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#1FBBB0" transform="rotate(60 50 50)" />
        {/* Petal 3: Bottom Right (Green) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#7CB342" transform="rotate(120 50 50)" />
        {/* Petal 4: Bottom (Purple) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#671E75" transform="rotate(180 50 50)" />
        {/* Petal 5: Bottom Left (Dark Green) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#40904F" transform="rotate(240 50 50)" />
        {/* Petal 6: Top Left (Teal) */}
        <rect x="44" y="6" width="12" height="38" rx="6" fill="#00ACC1" transform="rotate(300 50 50)" />
      </svg>

      {/* Text Branding */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: height * 0.48,
            letterSpacing: '-0.02em',
            color: variant === 'white' ? '#FFFFFF' : '#074A76',
          }}
        >
          NCGR
        </span>
        <span
          style={{
            fontFamily: "'Segoe UI', 'Tahoma', sans-serif",
            fontWeight: 600,
            fontSize: height * 0.22,
            color: variant === 'white' ? 'rgba(255,255,255,0.85)' : '#074A76',
            whiteSpace: 'nowrap',
          }}
        >
          المركز الوطني لنظم الموارد الحكومية
        </span>
      </div>
    </div>
  );
};

export default NCGRLogo;
