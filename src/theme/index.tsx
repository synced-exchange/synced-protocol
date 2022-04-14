import React from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'

import { Colors, Shadows } from './styled'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export enum SupportedThemes {
  DARK = 'dark',
}

function colors(themeName: SupportedThemes): Colors {
  // define colour scheme for each supported theme
  const themeColors = {
    [SupportedThemes.DARK]: {
      themeName: SupportedThemes.DARK,

      // base
      white,
      black,

      themeColor: '#83D7FD',

      // text
      text1: '#EFEFEF',
      text2: '#000000',
      text3: 'rgba(255, 255, 255, 0.75)',
      text4: 'rgba(255, 255, 255, 0.5)',

      // backgrounds / greys
      bg0: '#000000',
      bg1: '#151515',
      bg2: '#02000F',
      bg3: '#050505',
      bg4: 'linear-gradient(180deg, #070707 23.96%, #000000 81.77%)',

      // borders
      border1: '#0E1526',
      border2: '#151515',
      border3:
        'linear-gradient(0deg, #010206, #010206), linear-gradient(90deg, rgba(131, 215, 253, 0.6) 1.98%, rgba(232, 207, 250, 0.6) 102.09%), #FFFFFF',

      //specialty colors
      specialBG1:
        'linear-gradient(90deg, #83D7FD 1.98%, #E8CFFA 102.09%), linear-gradient(90deg, #00E6D9 1.98%, #75D8FB 49.43%), #121826',
      specialBG2:
        'linear-gradient(90deg, #E8CFFA 1.98%, #83D7FD 102.09%), linear-gradient(90deg, #75D8FB 1.98%, #00E6D9 49.43%), #121826',
      specialBG3: 'linear-gradient(#83D7FD 100%, #E8CFFA 100%)',

      // primary colors
      primary1: 'linear-gradient(90deg, #00E6D9 1.98%, #75D8FB 49.43%)',
      primary2: 'linear-gradient(90deg, #75D8FB 1.98%, #00E6D9 98.43%)',
      primary3: '#FFBA35',

      // color text
      primaryText1: '#1749FA', // TODO check if we want these values

      // secondary colors
      secondary1: '#1749FA',
      secondary2: 'rgba(23, 73, 250, 0.2)',

      // other
      red1: '#FF4343',
      red2: '#F82D3A',
      red3: '#FF3300',
      green1: '#27AE60',
      yellow1: '#E3A507',
      yellow2: '#FF8F00',
      yellow3: '#F3B71E',
      blue1: '#2172E5',
      blue2: '#5199FF',

      error: '#FD4040',
      success: '#27AE60',
      warning: '#FF8F00',
    },
  }
  // default the theme to dark mode
  return themeName in SupportedThemes ? themeColors[SupportedThemes.DARK] : themeColors[themeName]
}

// define shadow scheme for each supported theme
function shadows(themeName: SupportedThemes): Shadows {
  const themeShadows = {
    [SupportedThemes.DARK]: {
      shadow1: '#000',
      boxShadow1: '0px 0px 4px rgba(0, 0, 0, 0.125)',
      boxShadow2: '0px 5px 5px rgba(0, 0, 0, 0.15)',
    },
  }
  // default the theme to dark mode
  return themeName in SupportedThemes ? themeShadows[SupportedThemes.DARK] : themeShadows[themeName]
}

function theme(themeName: SupportedThemes): DefaultTheme {
  return {
    ...colors(themeName),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    ...shadows(themeName),

    // media queries
    mediaWidth: mediaWidthTemplates,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // get theme name from url if any

  // Enable the below when we support multiple themes
  // const router = useRouter()
  // const parsed = router.query?.theme

  //const parsedTheme = parsed && typeof parsed === 'string' ? parsed : undefined
  //const darkMode = useIsDarkMode()

  // let themeName: SupportedThemes
  // if (parsedTheme && Object.values(SupportedThemes).some((theme: string) => theme === parsedTheme)) {
  //   themeName = parsedTheme as SupportedThemes
  // } else {
  //   themeName = darkMode ? SupportedThemes.DARK : SupportedThemes.LIGHT
  // }

  // const themeObject = useMemo(() => theme(SupportedThemes.DARK), [SupportedThemes.DARK])

  const themeObject = theme(SupportedThemes.DARK)

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  Label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  Black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  White(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  Blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  Yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow3'} {...props} />
  },
  DarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  Gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  Italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.black} !important;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  a {
    color: ${({ theme }) => theme.text1}; 
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter';
    background: ${({ theme }) => theme.black};
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 0px;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  * {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: hidden;
  }
  *::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`
