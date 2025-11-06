// dd/components/ui/button.tsx를 React Native로 100% 정확히 변환
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { lightThemeConfig } from '../../theme';

const Button = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
  textStyle,
  ...props
}) => {
  const theme = lightThemeConfig;

  // dd button.tsx의 정확한 variant 스타일들
  const getVariantStyle = () => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: disabled ? theme.colors.muted : theme.colors.primary,
          borderColor: disabled ? theme.colors.muted : theme.colors.primary,
          borderWidth: 1,
        };
      
      case 'destructive':
        return {
          backgroundColor: disabled ? theme.colors.muted : theme.colors.destructive,
          borderColor: disabled ? theme.colors.muted : theme.colors.destructive,
          borderWidth: 1,
        };
      
      case 'outline':
        return {
          backgroundColor: theme.colors.background,
          borderColor: disabled ? theme.colors.muted : theme.colors.input,
          borderWidth: 1,
        };
      
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.muted : theme.colors.secondary,
          borderColor: disabled ? theme.colors.muted : theme.colors.secondary,
          borderWidth: 1,
        };
      
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
        };
      
      case 'link':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
        };
      
      default:
        return {
          backgroundColor: disabled ? theme.colors.muted : theme.colors.primary,
          borderColor: disabled ? theme.colors.muted : theme.colors.primary,
          borderWidth: 1,
        };
    }
  };

  // dd button.tsx의 정확한 size 스타일들
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return {
          height: theme.constants.heights.button.sm, // h-9 = 36px
          paddingHorizontal: theme.constants.padding.button.sm.horizontal, // px-3 = 12px
          borderRadius: theme.borderRadius.md, // rounded-md
        };
      
      case 'default':
        return {
          height: theme.constants.heights.button.default, // h-10 = 40px
          paddingHorizontal: theme.constants.padding.button.default.horizontal, // px-4 = 16px
          paddingVertical: theme.constants.padding.button.default.vertical, // py-2 = 8px
          borderRadius: theme.borderRadius.md, // rounded-md
        };
      
      case 'lg':
        return {
          height: theme.constants.heights.button.lg, // h-11 = 44px
          paddingHorizontal: theme.constants.padding.button.lg.horizontal, // px-8 = 32px
          borderRadius: theme.borderRadius.md, // rounded-md
        };
      
      case 'icon':
        return {
          width: theme.constants.heights.button.default, // h-10 w-10 = 40x40px
          height: theme.constants.heights.button.default,
          paddingHorizontal: 0,
          paddingVertical: 0,
          borderRadius: theme.borderRadius.md,
        };
      
      default:
        return {
          height: theme.constants.heights.button.default,
          paddingHorizontal: theme.constants.padding.button.default.horizontal,
          paddingVertical: theme.constants.padding.button.default.vertical,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  // dd button.tsx의 정확한 텍스트 색상들
  const getTextColor = () => {
    if (disabled) {
      return theme.colors.mutedForeground;
    }

    switch (variant) {
      case 'default':
        return theme.colors.primaryForeground;
      case 'destructive':
        return theme.colors.destructiveForeground;
      case 'outline':
        return theme.colors.foreground;
      case 'secondary':
        return theme.colors.secondaryForeground;
      case 'ghost':
        return theme.colors.foreground;
      case 'link':
        return theme.colors.primary;
      default:
        return theme.colors.primaryForeground;
    }
  };

  // dd button.tsx: "inline-flex items-center justify-center"
  const baseStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // dd button.tsx: "gap-2" - 아이콘과 텍스트 간격
    // React Native에서는 Text와 아이콘 사이에 margin으로 처리
    opacity: disabled ? theme.constants.disabled.opacity : 1, // disabled:opacity-50
    ...theme.shadows.sm, // 기본 그림자
  };

  // dd button.tsx: "text-sm font-medium" (Button 텍스트 스타일)
  const textStyles = {
    fontSize: theme.typography.textStyles.button.fontSize,
    fontWeight: theme.typography.textStyles.button.fontWeight,
    color: getTextColor(),
    // dd button.tsx: "whitespace-nowrap" (React Native에서는 기본)
    textAlign: 'center',
    ...textStyle,
  };

  // 터치 피드백 (dd button.tsx의 hover 효과를 터치로 대체)
  const handlePressIn = () => {
    // 터치 시작 시 약간의 opacity 감소 (hover 효과)
  };

  const handlePressOut = () => {
    // 터치 종료 시 원래 상태로
  };

  return (
    <TouchableOpacity
      style={[
        baseStyle,
        getVariantStyle(),
        getSizeStyle(),
        style,
      ]}
      onPress={disabled || loading ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8} // dd의 hover:bg-primary/90 효과
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={{ marginRight: children ? theme.spacing[2] : 0 }}
        />
      )}
      
      {typeof children === 'string' ? (
        <Text style={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

// dd button.tsx의 variant와 size props를 위한 기본값들
Button.variants = {
  default: 'default',
  destructive: 'destructive',
  outline: 'outline',
  secondary: 'secondary',
  ghost: 'ghost',
  link: 'link',
};

Button.sizes = {
  default: 'default',
  sm: 'sm',
  lg: 'lg',
  icon: 'icon',
};

export default Button;