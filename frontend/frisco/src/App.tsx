import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';

import PrivateRoute from './utils/PrivateRoute';

import Questionnaire from './Pages/Questionnaire/Questionnaire';
import Admin from './Pages/Admin/Admin';
import LoginPage from './Pages/Login/LoginPage';
import FlowchartPage from './Pages/FlowchartPage/FlowchartPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/flowchart" element={<FlowchartPage/>} />
          <Route path="/" element={<Questionnaire />} />
          <Route path="/admin"
            element={
              <PrivateRoute authenticationPath="/login">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
