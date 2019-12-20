import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./config/configureStore";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import CssBaseline from "@material-ui/core/CssBaseline";


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      // contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      // contrastText: '#fff',
    }
  }
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
