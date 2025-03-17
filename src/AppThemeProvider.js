import React, { useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from './contexts/ThemeContext';

const AppThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};

export default AppThemeProvider;
