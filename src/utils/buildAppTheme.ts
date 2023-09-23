// This is for adding types to the theme, so typescript can read them on use
declare module '@mui/material/styles' {
  interface PaletteColor {
    generalBoxShadow: string;
    starYellow: string;
  }
  interface TypeText {
    primaryInverted: string;
    secondaryInverted: string;
  }
  interface TypeBackground {
    transparent: string;
    lightBlue: string;
  }
}

export const buildAppTheme = () => ({
  palette: {
    primary: {
      main: 'rgba(0, 26, 183, 1)',
      light: 'rgba(91, 190, 85, 1)',
      generalBoxShadow: '0 1px 4px rgba(0, 0, 0, .16)',
      starYellow: 'rgb(225, 211, 25)',
    },
    background: {
      default: 'rgb(255, 255, 255)',
      transparent: 'rgba(255, 255, 255, 0)',
      paper: 'rgba(241, 242, 243, 1)',
      lightBlue: 'rgba(88, 86, 214, 0.1)',
    },
    text: {
      primary: 'rgb(13 13, 13)',
      secondary: 'rgba(13, 13, 13, 0.7)',
      primaryInverted: 'rgba(255, 255, 255, 1)',
      secondaryInverted: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.82rem',
    },
  },
  // Here we can override MUI styles in their components
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});
