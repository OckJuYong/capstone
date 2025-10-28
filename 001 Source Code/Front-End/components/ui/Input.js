// dd/components/ui/input.tsx를 React Native로 100% 정확히 변환
import React, { useState, forwardRef } from 'react';
import { TextInput, View, Text } from 'react-native';
import { lightThemeConfig } from '../../theme';

const Input = forwardRef(({
  label,
  error,
  helperText,
  style,
  containerStyle,
  labelStyle,
  errorStyle,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = lightThemeConfig;

  // dd input.tsx의 정확한 기본 스타일
  // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
  const baseInputStyle = {
    height: multiline ? undefined : theme.constants.heights.input, // h-10 = 40px
    minHeight: multiline ? theme.constants.heights.input : undefined,
    width: '100%', // w-full
    borderRadius: theme.borderRadius.md, // rounded-md
    borderWidth: isFocused ? 2 : 1,
    borderColor: error 
      ? theme.colors.destructive 
      : isFocused 
        ? theme.colors.ring // focus-visible:ring-ring
        : theme.colors.input, // border-input
    backgroundColor: disabled 
      ? theme.colors.muted 
      : theme.colors.background, // bg-background
    paddingHorizontal: theme.constants.padding.input.horizontal, // px-3 = 12px
    paddingVertical: theme.constants.padding.input.vertical, // py-2 = 8px
    
    // dd input.tsx: "text-base md:text-sm" - 모바일에서는 16px로 확대 방지
    fontSize: theme.typography.textStyles.input.fontSize,
    fontWeight: theme.typography.textStyles.input.fontWeight,
    color: disabled 
      ? theme.colors.mutedForeground 
      : theme.colors.foreground,
    
    // dd input.tsx: "ring-offset-background" - focus 상태
    // React Native에서는 outline 제거
    outlineWidth: 0,
    
    // dd input.tsx: "disabled:cursor-not-allowed disabled:opacity-50"
    opacity: disabled ? theme.constants.disabled.opacity : 1,
    
    // Placeholder 색상: "placeholder:text-muted-foreground"
    // React Native에서는 placeholderTextColor prop으로 처리
  };

  // Label 스타일 (dd에서는 별도 컴포넌트지만 여기서는 통합)
  const labelStyles = {
    fontSize: theme.typography.textStyles.label.fontSize,
    fontWeight: theme.typography.textStyles.label.fontWeight,
    color: theme.colors.foreground,
    marginBottom: theme.spacing[2], // 8px
    ...labelStyle,
  };

  // Error 텍스트 스타일
  const errorStyles = {
    fontSize: theme.typography.textStyles.caption.fontSize,
    fontWeight: theme.typography.textStyles.caption.fontWeight,
    color: theme.colors.destructive,
    marginTop: theme.spacing[1], // 4px
    ...errorStyle,
  };

  // Helper 텍스트 스타일
  const helperTextStyles = {
    fontSize: theme.typography.textStyles.caption.fontSize,
    fontWeight: theme.typography.textStyles.caption.fontWeight,
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing[1], // 4px
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      {label && (
        <Text style={labelStyles}>
          {label}
        </Text>
      )}
      
      <TextInput
        ref={ref}
        style={[baseInputStyle, style]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedForeground} // dd: "placeholder:text-muted-foreground"
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        // dd input.tsx: "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
        // React Native에서는 file input이 없으므로 해당 없음
        {...props}
      />
      
      {error && (
        <Text style={errorStyles}>
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text style={helperTextStyles}>
          {helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;