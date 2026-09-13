import { createTheme } from '@mui/material/styles'

/**
 * Palette is named after the training floor: a deep spring-floor green for
 * structure, a softer moss green for secondary actions, chalk for the working
 * surface, and pad red reserved for the one primary action (Generate).
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1f4d3a',
    },
    secondary: {
      main: '#6b8f71',
    },
    error: {
      main: '#c1401f',
    },
    warning: {
      main: '#d3a036',
    },
    background: {
      default: '#f6f3ec',
      paper: '#f6f3ec',
    },
    divider: '#cfc9b8',
    text: {
      primary: '#3a3f3b',
      secondary: '#6e736f',
    },
  },
  typography: {
    fontFamily: '"Archivo", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: '1px solid #cfc9b8',
          '&:before': { display: 'none' },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})

export default theme
