import {
  createMuiTheme
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        // borderRadius: '2px'
      }
    },
    MuiTypography: {
      h1: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
      },
      h2: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
      },
      h3: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
      },
      h4: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
      },
      h5: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
      },
    }
  },
  palette: {
    primary: {
      main: '#15304C'
    },
    secondary: {
      main: '#15304C'
    },
    success: {
      main: '#0e9e23'
    },
    error: {
      main: '#7F2B23',
      light: '#e96363'
    }
  },
  typography: {
    // useNextVariants: true, // https://material-ui.com/style/typography/#migration-to-typography-v2
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Lato', 'sans-serif'].join(',')
  }
});

export default theme;
