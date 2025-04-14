import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import LoginPage from '@pages/auth/login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Aquí luego añadirás más rutas como /register, /dashboard, etc. */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);