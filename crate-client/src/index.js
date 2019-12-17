import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./config/configureStore";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    "fontFamily": "Roboto"
  },
  palette: {
    primary: {
      light: '#337f83',
      main: '#006064',
      dark: '#004346',
      contrastText: '#fff',
    },
    secondary: {
      light: '#337f83',
      main: '#006064',
      dark: '#004346',
      contrastText: '#000',
    },
  },
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
