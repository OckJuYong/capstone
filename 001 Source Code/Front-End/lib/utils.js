// dd의 @/lib/utils와 동일한 유틸리티 함수들
// dd에서 사용하는 clsx, tailwind-merge 기능을 React Native용으로 구현

/**
 * dd의 cn (className) 함수를 React Native 스타일 병합 함수로 변환
 * StyleSheet.flatten과 유사하지만 더 유연한 병합을 제공
 */
export const mergeStyles = (...styles) => {
  const result = {};
  
  styles.forEach(style => {
    if (!style) return;
    
    if (Array.isArray(style)) {
      // 배열인 경우 재귀적으로 병합
      Object.assign(result, mergeStyles(...style));
    } else if (typeof style === 'object') {
      // 객체인 경우 직접 병합
      Object.assign(result, style);
    }
  });
  
  return result;
};

/**
 * dd의 clsx 함수와 유사한 조건부 스타일 적용
 */
export const conditionalStyle = (conditions) => {
  const styles = [];
  
  Object.entries(conditions).forEach(([style, condition]) => {
    if (condition) {
      styles.push(style);
    }
  });
  
  return styles;
};

/**
 * dd에서 사용하는 Tailwind 클래스명을 React Native 스타일로 변환하는 헬퍼
 * (개발 중에 dd 코드를 빠르게 변환할 때 유용)
 */
export const twToRN = (className, theme) => {
  const classes = className.split(' ');
  const styles = {};
  
  classes.forEach(cls => {
    // 기본적인 Tailwind -> RN 변환 로직
    // 실제 프로덕션에서는 더 완전한 변환 라이브러리 사용 권장
    
    if (cls.startsWith('p-')) {
      const value = cls.substring(2);
      styles.padding = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('px-')) {
      const value = cls.substring(3);
      styles.paddingHorizontal = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('py-')) {
      const value = cls.substring(3);
      styles.paddingVertical = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('m-')) {
      const value = cls.substring(2);
      styles.margin = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('mx-')) {
      const value = cls.substring(3);
      styles.marginHorizontal = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('my-')) {
      const value = cls.substring(3);
      styles.marginVertical = theme?.spacing?.[value] || parseInt(value) * 4;
    }
    
    if (cls.startsWith('rounded-')) {
      const radius = cls.substring(8);
      if (radius === 'md') styles.borderRadius = theme?.borderRadius?.md || 6;
      if (radius === 'lg') styles.borderRadius = theme?.borderRadius?.lg || 8;
      if (radius === 'xl') styles.borderRadius = theme?.borderRadius?.xl || 12;
    }
    
    // 색상 클래스들
    if (cls === 'bg-primary') styles.backgroundColor = theme?.colors?.primary;
    if (cls === 'bg-secondary') styles.backgroundColor = theme?.colors?.secondary;
    if (cls === 'text-primary') styles.color = theme?.colors?.primary;
    if (cls === 'text-secondary') styles.color = theme?.colors?.secondary;
    
    // Flexbox
    if (cls === 'flex') styles.display = 'flex';
    if (cls === 'flex-row') styles.flexDirection = 'row';
    if (cls === 'flex-col') styles.flexDirection = 'column';
    if (cls === 'items-center') styles.alignItems = 'center';
    if (cls === 'justify-center') styles.justifyContent = 'center';
    if (cls === 'justify-between') styles.justifyContent = 'space-between';
    
    // 텍스트
    if (cls === 'text-center') styles.textAlign = 'center';
    if (cls === 'text-left') styles.textAlign = 'left';
    if (cls === 'text-right') styles.textAlign = 'right';
    if (cls === 'font-bold') styles.fontWeight = 'bold';
    if (cls === 'font-medium') styles.fontWeight = '500';
    if (cls === 'font-semibold') styles.fontWeight = '600';
  });
  
  return styles;
};

/**
 * dd의 cva (class-variance-authority)와 유사한 variant 시스템
 */
export const createVariants = (base, variants, defaultVariants = {}) => {
  return (props = {}) => {
    const styles = [base];
    
    // 기본 variants 적용
    Object.entries(defaultVariants).forEach(([key, defaultValue]) => {
      const variantValue = props[key] || defaultValue;
      if (variants[key] && variants[key][variantValue]) {
        styles.push(variants[key][variantValue]);
      }
    });
    
    // props로 전달된 variants 적용
    Object.entries(props).forEach(([key, value]) => {
      if (variants[key] && variants[key][value]) {
        styles.push(variants[key][value]);
      }
    });
    
    return mergeStyles(...styles);
  };
};

/**
 * dd에서 사용하는 focus-visible, hover 등의 상태를 React Native에서 처리하는 헬퍼
 */
export const createInteractiveStyles = (baseStyle, states = {}) => {
  return {
    base: baseStyle,
    pressed: mergeStyles(baseStyle, states.pressed),
    focused: mergeStyles(baseStyle, states.focused),
    disabled: mergeStyles(baseStyle, states.disabled),
    hover: states.hover ? mergeStyles(baseStyle, states.hover) : baseStyle,
  };
};

/**
 * dd의 Radix UI slot 기능을 React Native에서 구현하는 헬퍼
 */
export const Slot = ({ children, style, ...props }) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      style: mergeStyles(children.props.style, style),
    });
  }
  
  return children;
};

/**
 * 색상 유틸리티 (dd에서 사용하는 HSL 처리)
 */
export const hslToRgba = (h, s, l, a = 1) => {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * dd의 디자인 시스템에서 사용하는 반응형 값 처리
 */
export const responsive = (value, breakpoints = {}) => {
  // React Native에서는 Dimensions를 사용하여 화면 크기에 따라 다른 값 반환
  const { width } = Dimensions.get('window');
  
  if (width >= (breakpoints.lg || 1024)) {
    return value.lg || value.default || value;
  } else if (width >= (breakpoints.md || 768)) {
    return value.md || value.default || value;
  } else if (width >= (breakpoints.sm || 640)) {
    return value.sm || value.default || value;
  }
  
  return value.default || value;
};

// React import 추가
import React from 'react';
import { Dimensions } from 'react-native';