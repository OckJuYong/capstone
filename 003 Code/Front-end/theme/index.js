// dd 프로젝트 디자인 시스템을 완전히 이식한 React Native 테마
import { lightTheme, darkTheme } from './colors';
import { spacing, borderRadius, containerPadding, shadows } from './spacing';
import { typography } from './typography';

// dd의 완전한 디자인 시스템 통합
const createTheme = (isDark = false) => {
  const colors = isDark ? darkTheme : lightTheme;
  
  return {
    // 색상 시스템 - dd CSS 변수 100% 매핑
    colors,
    
    // 간격 시스템 - dd Tailwind 설정 100% 매핑
    spacing,
    borderRadius,
    containerPadding,
    
    // 그림자 시스템 - dd shadow-sm 등을 React Native로 변환
    shadows,
    
    // 타이포그래피 - dd 컴포넌트의 폰트 설정 정확히 이식
    typography,
    
    // 테마 모드
    isDark,
    
    // dd 특화 값들
    constants: {
      // dd tailwind.config.js의 --radius: 0.5rem
      defaultRadius: 8,
      
      // dd의 기본 높이 값들 (button.tsx에서 추출)
      heights: {
        button: {
          sm: 36,     // h-9
          default: 40, // h-10
          lg: 44,     // h-11
        },
        input: 40,    // h-10 (input.tsx)
      },
      
      // dd에서 사용하는 기본 패딩 값들
      padding: {
        button: {
          sm: { horizontal: 12, vertical: 0 },      // px-3
          default: { horizontal: 16, vertical: 8 }, // px-4 py-2
          lg: { horizontal: 32, vertical: 0 },      // px-8
        },
        input: { horizontal: 12, vertical: 8 },     // px-3 py-2
        card: {
          header: 24,  // p-6 (CardHeader)
          content: 24, // p-6 (CardContent)
          footer: 24,  // p-6 (CardFooter)
        },
      },
      
      // dd transition 설정들
      transitions: {
        // button.tsx: transition-colors
        default: 200,
        fast: 150,
        slow: 300,
      },
      
      // dd의 focus ring 설정
      focusRing: {
        width: 2,           // ring-2
        offset: 2,          // ring-offset-2
        opacity: 1,         // 완전 불투명
      },
      
      // dd에서 사용하는 비활성 상태
      disabled: {
        opacity: 0.5,       // disabled:opacity-50
      },
      
      // dd에서 사용하는 hover 상태 opacity
      hover: {
        opacity: 0.9,       // hover:bg-primary/90
      },
    },
    
    // 자주 사용되는 스타일 조합들 (dd 컴포넌트에서 추출)
    styles: {
      // Button variants (button.tsx에서 정확히 추출)
      button: {
        default: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        destructive: {
          backgroundColor: colors.destructive,
          borderColor: colors.destructive,
        },
        outline: {
          backgroundColor: colors.background,
          borderColor: colors.input,
        },
        secondary: {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        link: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      },
      
      // Card styles (card.tsx에서 정확히 추출)
      card: {
        default: {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: borderRadius.lg,
        },
      },
      
      // Input styles (input.tsx에서 정확히 추출)
      input: {
        default: {
          backgroundColor: colors.background,
          borderColor: colors.input,
          borderWidth: 1,
          borderRadius: borderRadius.md,
        },
        focused: {
          borderColor: colors.ring,
          borderWidth: 2,
        },
      },
    },
  };
};

// 기본 테마들
export const lightThemeConfig = createTheme(false);
export const darkThemeConfig = createTheme(true);

// 테마 생성 함수
export { createTheme };

// 개별 모듈들도 내보내기
export { lightTheme, darkTheme } from './colors';
export { spacing, borderRadius, containerPadding, shadows } from './spacing';
export { typography } from './typography';