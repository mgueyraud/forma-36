import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import tokens from '@contentful/f36-tokens';
import { useTheme as useEmotionTheme } from 'emotion-theming';

import type { Theme } from './types';

export function createTheme(
  theme: Partial<Theme>,
  baseTheme: Theme = Default,
): Theme {
  const themeKeys = Object.keys(baseTheme);

  return themeKeys.reduce((accumulator: any, key: keyof Theme) => {
    const defaultValue = baseTheme[key];
    const value = theme[key];

    if (
      typeof defaultValue === 'string' ||
      typeof value === 'string' ||
      Array.isArray(defaultValue)
    ) {
      accumulator[key] = value == null ? defaultValue : value;
    } else {
      accumulator[key] = {
        ...baseTheme[key],
        ...theme[key],
      };
    }

    return accumulator;
  }, {});
}

export const Default = createTheme(
  {},
  {
    colors: {
      primary: tokens.blue500,
      positive: tokens.green500,
      negative: tokens.red500,
      warning: tokens.orange400,
    },
    buttonPrimary: {
      mainColor: tokens.blue500,
      textColor: tokens.colorWhite,
      mainColorStates: tokens.blue600,
      boxShadow: tokens.glowPrimary,
      mainColorActive: tokens.blue700,
    },
    buttonSecondary: {
      mainColor: tokens.colorWhite,
      textColor: tokens.gray900,
      mainColorStates: tokens.gray100,
      boxShadow: tokens.glowPrimary,
      borderColor: tokens.gray300,
      mainColorActive: tokens.gray200,
    },
    buttonPositive: {
      mainColor: tokens.colorPositive,
      textColor: tokens.colorWhite,
      mainColorStates: tokens.green600,
      boxShadow: tokens.glowPositive,
      mainColorActive: tokens.green700,
    },
    buttonNegative: {
      mainColor: tokens.red600,
      textColor: tokens.colorWhite,
      mainColorStates: tokens.red700,
      boxShadow: tokens.glowNegative,
      mainColorActive: tokens.red800,
    },
    buttonTransparent: {
      mainColor: tokens.blue500,
      textColor: tokens.gray800,
      mainColorStates: tokens.gray100,
      boxShadow: tokens.glowPrimary,
      textColorActive: tokens.gray900,
      mainColorActive: tokens.gray100,
    },
    copyButton: {
      mainColor: tokens.colorWhite,
      mainColorHover: tokens.gray100,
      mainColorActive: tokens.gray200,
      mainColorDisableActive: tokens.gray300,
      borderColor: tokens.gray300,
      boxShadow: tokens.glowMuted,
    },
    globalStyles: {
      body: {
        backgroundColor: tokens.colorWhite,
        color: tokens.gray800,
      },
    },
    displayText: {
      color: tokens.gray900,
    },
    heading: {
      color: tokens.gray900,
    },
    subheading: {
      color: tokens.gray900,
    },
    text: {
      color: tokens.gray800,
    },
    card: {
      backgroundColor: tokens.colorWhite,
    },
    textLinkPrimary: {
      color: tokens.blue600,
      hoverColor: tokens.blue700,
    },
  },
);

export const Dark = createTheme({
  colors: {
    primary: tokens.blue300,
    positive: tokens.green300,
    negative: tokens.red300,
    warning: tokens.orange200,
  },
  buttonPrimary: {
    mainColor: tokens.blue300,
    textColor: tokens.gray800,
    mainColorStates: tokens.blue400,
    boxShadow: tokens.glowPrimary,
    mainColorActive: tokens.blue500,
  },
  buttonSecondary: {
    mainColor: tokens.gray500,
    textColor: tokens.colorWhite,
    mainColorStates: tokens.gray700,
    boxShadow: tokens.glowPrimary,
    borderColor: tokens.gray200,
    mainColorActive: tokens.gray600,
  },
  buttonNegative: {
    mainColor: tokens.red400,
    textColor: tokens.colorWhite,
    mainColorStates: tokens.red500,
    boxShadow: tokens.glowNegative,
    mainColorActive: tokens.red500,
  },
  buttonPositive: {
    mainColor: tokens.green300,
    textColor: tokens.colorWhite,
    mainColorStates: tokens.green400,
    boxShadow: tokens.glowPositive,
    mainColorActive: tokens.green400,
  },
  buttonTransparent: {
    mainColor: tokens.blue500,
    textColor: tokens.colorWhite,
    mainColorStates: tokens.gray100,
    boxShadow: tokens.glowPrimary,
    textColorActive: tokens.gray800,
    mainColorActive: tokens.gray100,
  },
  copyButton: {
    mainColor: tokens.gray500,
    mainColorHover: tokens.gray500,
    mainColorActive: tokens.gray500,
    mainColorDisableActive: tokens.gray500,
    borderColor: tokens.gray700,
    boxShadow: tokens.glowMuted,
  },
  globalStyles: {
    body: {
      backgroundColor: tokens.gray900,
      color: tokens.gray100,
    },
  },
  displayText: {
    color: tokens.gray100,
  },
  heading: {
    color: tokens.gray100,
  },
  text: {
    color: tokens.gray200,
  },
  card: {
    backgroundColor: tokens.gray900,
  },
  textLinkPrimary: {
    color: tokens.blue400,
    hoverColor: tokens.blue500,
  },
});

export const Forma36Context = createContext<{
  isDarkmode: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  theme: Theme;
}>({ isDarkmode: false, setTheme: () => {}, theme: Default });

export interface Forma36ProviderProps {
  children: React.ReactNode;
  // themes?: Record<ThemeName, Theme>;
  theme?: Theme;
}

export function Forma36Provider({
  children,
  theme: defaultTheme = Default,
}: Forma36ProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <Forma36Context.Provider
      value={{ isDarkmode: theme !== defaultTheme, setTheme, theme }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Forma36Context.Provider>
  );
}

export const useTheme = useEmotionTheme;
