// dd 프로젝트의 타이포그래피 시스템을 React Native용으로 변환
// 기본 폰트: Arial, Helvetica, sans-serif (globals.css body)

const typography = {
  // dd의 기본 폰트 설정
  fontFamily: {
    // React Native에서는 플랫폼별 기본 폰트 사용
    default: 'System', // iOS: San Francisco, Android: Roboto
  },

  // dd UI 컴포넌트들에서 사용하는 정확한 폰트 크기들
  fontSize: {
    // button.tsx: text-sm = 14px
    xs: 12,   // 0.75rem
    sm: 14,   // 0.875rem - dd button 기본 크기
    base: 16, // 1rem - dd input 기본 크기 (md:text-sm = 14px on desktop, text-base on mobile)
    lg: 18,   // 1.125rem
    xl: 20,   // 1.25rem
    '2xl': 24, // 1.5rem - dd card title 크기
    '3xl': 30, // 1.875rem
    '4xl': 36, // 2.25rem
  },

  // dd에서 사용하는 폰트 굵기 (button.tsx: font-medium, card.tsx: font-semibold)
  fontWeight: {
    normal: '400',    // font-normal
    medium: '500',    // font-medium - dd button 기본
    semibold: '600',  // font-semibold - dd card title
    bold: '700',      // font-bold
  },

  // dd에서 사용하는 줄 간격
  lineHeight: {
    tight: 1.25,  // leading-tight
    normal: 1.5,  // leading-normal
    relaxed: 1.625, // leading-relaxed
    // card.tsx CardTitle: "leading-none tracking-tight"
    none: 1,      // leading-none - dd card title
  },

  // dd에서 사용하는 글자 간격 (card.tsx: tracking-tight)
  letterSpacing: {
    tighter: -0.5,  // tracking-tighter
    tight: -0.25,   // tracking-tight - dd card title
    normal: 0,      // tracking-normal
    wide: 0.25,     // tracking-wide
  },

  // dd에서 정의된 텍스트 스타일들 (컴포넌트별로 정확히 매핑)
  textStyles: {
    // Button 컴포넌트 스타일 (button.tsx)
    button: {
      fontSize: 14,      // text-sm
      fontWeight: '500', // font-medium
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Card Title 스타일 (card.tsx: text-2xl font-semibold leading-none tracking-tight)
    cardTitle: {
      fontSize: 24,       // text-2xl
      fontWeight: '600',  // font-semibold
      lineHeight: 1,      // leading-none
      letterSpacing: -0.25, // tracking-tight
    },

    // Card Description 스타일 (card.tsx: text-sm text-muted-foreground)
    cardDescription: {
      fontSize: 14,      // text-sm
      fontWeight: '400', // font-normal
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Input 스타일 (input.tsx: text-base md:text-sm)
    input: {
      fontSize: 16,      // text-base (모바일에서는 16px로 확대 방지)
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Label 스타일 (추정 - 일반적인 form label)
    label: {
      fontSize: 14,      // text-sm
      fontWeight: '500', // font-medium
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Body text (일반 텍스트)
    body: {
      fontSize: 16,      // text-base
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Caption (작은 설명 텍스트)
    caption: {
      fontSize: 12,      // text-xs
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // Header styles (예상되는 헤더들)
    h1: {
      fontSize: 36,      // text-4xl
      fontWeight: '700', // font-bold
      lineHeight: 1.25,
      letterSpacing: -0.25,
    },

    h2: {
      fontSize: 30,      // text-3xl
      fontWeight: '600', // font-semibold
      lineHeight: 1.25,
      letterSpacing: -0.25,
    },

    h3: {
      fontSize: 24,      // text-2xl
      fontWeight: '600', // font-semibold
      lineHeight: 1.25,
      letterSpacing: -0.25,
    },

    h4: {
      fontSize: 20,      // text-xl
      fontWeight: '500', // font-medium
      lineHeight: 1.5,
      letterSpacing: 0,
    },
  },
};

export { typography };