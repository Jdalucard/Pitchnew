// This is for adding types to the theme, so typescript can read them on use
declare module '@mui/material/styles' {
  interface PaletteColor {
    generalBoxShadow: string;
  }
  interface TypeBackground {
    transparent: string;
  }
}

export const buildAppTheme = () => ({
  palette: {
    primary: {
      main: 'rgba(0, 26, 183, 1)',
      generalBoxShadow: '0 1px 4px rgba(0, 0, 0, .16)',
    },
    background: {
      default: 'rgb(255, 255, 255)',
      transparent: 'rgba(255, 255, 255, 0)',
      paper: 'rgba(241, 242, 243, 1)',
    },
    text: {
      primary: 'rgb(13 13, 13)',
      secondary: 'rgba(13, 13, 13, 0.7)',
      primaryInverted: 'rgba(225, 225, 225, 1)',
      secondaryInverted: 'rgba(225, 225, 225, 0.7)',
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
      fontStyle: 'italic',
      fontSize: '1.5rem',
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
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textDecoration: 'none',
  //         boxShadow: 'none',
  //         ':hover': {
  //           boxShadow: 'none',
  //         },
  //       },
  //     },
  //   },
  //   MuiListItem: {
  //     styleOverrides: {
  //       root: {
  //         padding: 0,
  //       },
  //     },
  //   },
  // },
});