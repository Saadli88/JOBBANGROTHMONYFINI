import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Assurez-vous que BrowserRouter est bien importé
import App from './App';
import { EmploiContextProvider } from './context/EmploiContext';
import { EntrepriseContextProvider } from './context/EntrepriseContext';
import { CandidatContextProvider } from './context/CandidatContext';
ReactDOM.render(
  <BrowserRouter>
  
      <CandidatContextProvider>
        <EntrepriseContextProvider>
        <EmploiContextProvider>
          <App />
          </EmploiContextProvider>
        </EntrepriseContextProvider>
      </CandidatContextProvider>
    
  </BrowserRouter>,
  document.getElementById('root')
);