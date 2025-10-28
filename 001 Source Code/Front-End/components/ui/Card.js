// dd/components/ui/card.tsx를 React Native로 100% 정확히 변환
import React from 'react';
import { View, Text } from 'react-native';
import { lightThemeConfig } from '../../theme';

// dd card.tsx의 Card 컴포넌트
const Card = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "rounded-lg border bg-card text-card-foreground shadow-sm"
  const cardStyle = {
    borderRadius: theme.borderRadius.lg, // rounded-lg
    borderWidth: 1,
    borderColor: theme.colors.border, // border
    backgroundColor: theme.colors.card, // bg-card
    // text-card-foreground는 children의 기본 텍스트 색상으로 처리
    ...theme.shadows.sm, // shadow-sm
    ...style,
  };

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

// dd card.tsx의 CardHeader 컴포넌트
const CardHeader = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "flex flex-col space-y-1.5 p-6"
  const headerStyle = {
    // flex flex-col은 React Native의 기본 동작
    flexDirection: 'column',
    // space-y-1.5 = 6px gap between children (React Native에서는 개별 처리)
    padding: theme.constants.padding.card.header, // p-6 = 24px
    ...style,
  };

  return (
    <View style={headerStyle} {...props}>
      {React.Children.map(children, (child, index) => {
        // space-y-1.5 구현: 첫 번째가 아닌 자식들에게 marginTop 추가
        if (React.isValidElement(child) && index > 0) {
          return React.cloneElement(child, {
            style: [
              { marginTop: theme.spacing[1.5] }, // 6px
              child.props.style,
            ],
          });
        }
        return child;
      })}
    </View>
  );
};

// dd card.tsx의 CardTitle 컴포넌트
const CardTitle = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "text-2xl font-semibold leading-none tracking-tight"
  const titleStyle = {
    fontSize: theme.typography.textStyles.cardTitle.fontSize, // text-2xl = 24px
    fontWeight: theme.typography.textStyles.cardTitle.fontWeight, // font-semibold = 600
    lineHeight: theme.typography.textStyles.cardTitle.lineHeight, // leading-none = 1
    letterSpacing: theme.typography.textStyles.cardTitle.letterSpacing, // tracking-tight = -0.25px
    color: theme.colors.cardForeground, // text-card-foreground
    ...style,
  };

  return (
    <Text style={titleStyle} {...props}>
      {children}
    </Text>
  );
};

// dd card.tsx의 CardDescription 컴포넌트
const CardDescription = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "text-sm text-muted-foreground"
  const descriptionStyle = {
    fontSize: theme.typography.textStyles.cardDescription.fontSize, // text-sm = 14px
    fontWeight: theme.typography.textStyles.cardDescription.fontWeight,
    color: theme.colors.mutedForeground, // text-muted-foreground
    ...style,
  };

  return (
    <Text style={descriptionStyle} {...props}>
      {children}
    </Text>
  );
};

// dd card.tsx의 CardContent 컴포넌트
const CardContent = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "p-6 pt-0"
  const contentStyle = {
    padding: theme.constants.padding.card.content, // p-6 = 24px
    paddingTop: 0, // pt-0
    ...style,
  };

  return (
    <View style={contentStyle} {...props}>
      {children}
    </View>
  );
};

// dd card.tsx의 CardFooter 컴포넌트
const CardFooter = ({ children, style, ...props }) => {
  const theme = lightThemeConfig;
  
  // dd card.tsx: "flex items-center p-6 pt-0"
  const footerStyle = {
    flexDirection: 'row', // flex (기본적으로 row)
    alignItems: 'center', // items-center
    padding: theme.constants.padding.card.footer, // p-6 = 24px
    paddingTop: 0, // pt-0
    ...style,
  };

  return (
    <View style={footerStyle} {...props}>
      {children}
    </View>
  );
};

// dd card.tsx처럼 모든 컴포넌트를 개별적으로 export
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

// 기본 export는 Card
export default Card;