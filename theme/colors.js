// dd 프로젝트의 CSS 변수를 React Native용으로 100% 정확히 변환
// 원본: dd/styles/globals.css의 :root 변수들

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const lightTheme = {
  // dd의 CSS 변수: --background: 0 0% 100%
  background: '#ffffff', // hsl(0, 0%, 100%)
  
  // dd의 CSS 변수: --foreground: 0 0% 3.9%
  foreground: '#0a0a0a', // hsl(0, 0%, 3.9%)
  
  // Card colors - dd의 CSS 변수 1:1 매핑
  card: '#ffffff', // hsl(0, 0%, 100%)
  cardForeground: '#0a0a0a', // hsl(0, 0%, 3.9%)
  
  // Popover colors
  popover: '#ffffff', // hsl(0, 0%, 100%)
  popoverForeground: '#0a0a0a', // hsl(0, 0%, 3.9%)
  
  // Primary colors - dd의 CSS 변수: --primary: 0 0% 9%
  primary: '#171717', // hsl(0, 0%, 9%)
  primaryForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  // Secondary colors - dd의 CSS 변수: --secondary: 0 0% 96.1%
  secondary: '#f5f5f5', // hsl(0, 0%, 96.1%)
  secondaryForeground: '#171717', // hsl(0, 0%, 9%)
  
  // Muted colors - dd의 CSS 변수: --muted: 0 0% 96.1%
  muted: '#f5f5f5', // hsl(0, 0%, 96.1%)
  mutedForeground: '#737373', // hsl(0, 0%, 45.1%)
  
  // Accent colors - dd의 CSS 변수: --accent: 0 0% 96.1%
  accent: '#f5f5f5', // hsl(0, 0%, 96.1%)
  accentForeground: '#171717', // hsl(0, 0%, 9%)
  
  // Destructive colors - dd의 CSS 변수: --destructive: 0 84.2% 60.2%
  destructive: '#ef4444', // hsl(0, 84.2%, 60.2%)
  destructiveForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  // Border and input - dd의 CSS 변수: --border: 0 0% 89.8%
  border: '#e5e5e5', // hsl(0, 0%, 89.8%)
  input: '#e5e5e5', // hsl(0, 0%, 89.8%)
  
  // Ring color for focus states - dd의 CSS 변수: --ring: 0 0% 3.9%
  ring: '#0a0a0a', // hsl(0, 0%, 3.9%)
  
  // Chart colors - dd의 CSS 변수들
  chart1: '#f97316', // hsl(12, 76%, 61%)
  chart2: '#10b981', // hsl(173, 58%, 39%)
  chart3: '#1e40af', // hsl(197, 37%, 24%)
  chart4: '#f59e0b', // hsl(43, 74%, 66%)
  chart5: '#f97316', // hsl(27, 87%, 67%)
  
  // Sidebar colors - dd의 사이드바 색상 시스템
  sidebarBackground: '#fafafa', // hsl(0, 0%, 98%)
  sidebarForeground: '#525252', // hsl(240, 5.3%, 26.1%)
  sidebarPrimary: '#262626', // hsl(240, 5.9%, 10%)
  sidebarPrimaryForeground: '#fafafa', // hsl(0, 0%, 98%)
  sidebarAccent: '#f5f5f5', // hsl(240, 4.8%, 95.9%)
  sidebarAccentForeground: '#262626', // hsl(240, 5.9%, 10%)
  sidebarBorder: '#e5e5e5', // hsl(220, 13%, 91%)
  sidebarRing: '#3b82f6', // hsl(217.2, 91.2%, 59.8%)
};

const darkTheme = {
  // dd 다크 테마 CSS 변수들을 정확히 변환
  background: '#0a0a0a', // hsl(0, 0%, 3.9%)
  foreground: '#fafafa', // hsl(0, 0%, 98%)
  
  card: '#0a0a0a', // hsl(0, 0%, 3.9%)
  cardForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  popover: '#0a0a0a', // hsl(0, 0%, 3.9%)
  popoverForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  primary: '#fafafa', // hsl(0, 0%, 98%)
  primaryForeground: '#171717', // hsl(0, 0%, 9%)
  
  secondary: '#262626', // hsl(0, 0%, 14.9%)
  secondaryForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  muted: '#262626', // hsl(0, 0%, 14.9%)
  mutedForeground: '#a3a3a3', // hsl(0, 0%, 63.9%)
  
  accent: '#262626', // hsl(0, 0%, 14.9%)
  accentForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  destructive: '#7f1d1d', // hsl(0, 62.8%, 30.6%)
  destructiveForeground: '#fafafa', // hsl(0, 0%, 98%)
  
  border: '#262626', // hsl(0, 0%, 14.9%)
  input: '#262626', // hsl(0, 0%, 14.9%)
  
  ring: '#d4d4d4', // hsl(0, 0%, 83.1%)
  
  // 다크 테마 차트 색상
  chart1: '#3b82f6', // hsl(220, 70%, 50%)
  chart2: '#10b981', // hsl(160, 60%, 45%)
  chart3: '#f59e0b', // hsl(30, 80%, 55%)
  chart4: '#8b5cf6', // hsl(280, 65%, 60%)
  chart5: '#ec4899', // hsl(340, 75%, 55%)
  
  // 다크 테마 사이드바 색상
  sidebarBackground: '#262626', // hsl(240, 5.9%, 10%)
  sidebarForeground: '#f5f5f5', // hsl(240, 4.8%, 95.9%)
  sidebarPrimary: '#3b82f6', // hsl(224.3, 76.3%, 48%)
  sidebarPrimaryForeground: '#ffffff', // hsl(0, 0%, 100%)
  sidebarAccent: '#404040', // hsl(240, 3.7%, 15.9%)
  sidebarAccentForeground: '#f5f5f5', // hsl(240, 4.8%, 95.9%)
  sidebarBorder: '#404040', // hsl(240, 3.7%, 15.9%)
  sidebarRing: '#3b82f6', // hsl(217.2, 91.2%, 59.8%)
};

export { lightTheme, darkTheme };