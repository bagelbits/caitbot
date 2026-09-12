import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
    },
    secondary: {
      light: '#834bff',
      main: '#651fff',
      dark: '#4615b2',
    },
  },
  typography: {
    fontFamily: 'Playpen Sans',
    fontWeightRegular: 300,
  },
})

export default theme
