import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Header from './components/Header';
import ProductList from './components/ProductList';
import { ThemeProvider } from './contexts/ThemeContext';
import AppThemeProvider from './AppThemeProvider';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppThemeProvider>
          <Header />
          <ProductList />
          <footer className="custom-footer">
            © {new Date().getFullYear()} My Store. All rights reserved.
          </footer>
        </AppThemeProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
