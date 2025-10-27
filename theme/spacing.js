// dd 프로젝트의 Tailwind spacing 시스템을 React Native용으로 변환
// Tailwind의 spacing 값들을 픽셀 단위로 정확히 변환 (1rem = 16px 기준)

const spacing = {
  // Tailwind spacing scale - dd에서 사용하는 모든 값들
  0: 0,
  0.5: 2,    // 0.125rem
  1: 4,      // 0.25rem
  1.5: 6,    // 0.375rem
  2: 8,      // 0.5rem
  2.5: 10,   // 0.625rem
  3: 12,     // 0.75rem
  3.5: 14,   // 0.875rem
  4: 16,     // 1rem
  5: 20,     // 1.25rem
  6: 24,     // 1.5rem
  7: 28,     // 1.75rem
  8: 32,     // 2rem
  9: 36,     // 2.25rem
  10: 40,    // 2.5rem
  11: 44,    // 2.75rem
  12: 48,    // 3rem
  14: 56,    // 3.5rem
  16: 64,    // 4rem
  20: 80,    // 5rem
  24: 96,    // 6rem
  28: 112,   // 7rem
  32: 128,   // 8rem
  36: 144,   // 9rem
  40: 160,   // 10rem
  44: 176,   // 11rem
  48: 192,   // 12rem
  52: 208,   // 13rem
  56: 224,   // 14rem
  60: 240,   // 15rem
  64: 256,   // 16rem
  72: 288,   // 18rem
  80: 320,   // 20rem
  96: 384,   // 24rem
};

// dd의 Border Radius 값들 - tailwind.config.js에서 정확히 추출
// --radius: 0.5rem = 8px
const borderRadius = {
  none: 0,
  sm: 6,     // calc(var(--radius) - 4px) = 8px - 4px = 4px -> 6px for better mobile UX
  md: 6,     // calc(var(--radius) - 2px) = 8px - 2px = 6px
  lg: 8,     // var(--radius) = 8px
  xl: 12,    // 0.75rem
  '2xl': 16, // 1rem
  '3xl': 24, // 1.5rem
  full: 9999,
};

// dd 프로젝트에서 자주 사용되는 특정 spacing 값들
const containerPadding = {
  // tailwind.config.js의 container.padding = "2rem" = 32px
  horizontal: 32,
  // 모바일에서는 조금 더 작게
  mobile: 16,
};

// dd에서 사용하는 그림자 시스템 (React Native elevation으로 변환)
// react-native-web을 위한 boxShadow 추가
const shadows = {
  sm: {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  md: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    elevation: 3,
  },
  lg: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    elevation: 5,
  },
  xl: {
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    elevation: 8,
  },
};

export { spacing, borderRadius, containerPadding, shadows };