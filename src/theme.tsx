import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1c2324',
    },
  },
  typography: {
    fontFamily: 'Arial',
    h2: {
      fontFamily: 'Carter One, cursive',
    },
  },
});

export default theme;
