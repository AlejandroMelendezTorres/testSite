import React from 'react';
import DashboardPage from './pages/DashboardPage';

/**
 * App
 * ----
 * Root application component. Keeps the app compact — currently it simply
 * renders the `DashboardPage`. This file is here to allow future top-level
 * providers (Router, Theme, Context) to be added easily.
 */
function App() {
  return (
    <DashboardPage />
  );
}

export default App;