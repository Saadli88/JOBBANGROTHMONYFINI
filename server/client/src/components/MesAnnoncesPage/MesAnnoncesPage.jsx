import React from "react";
import { useLocation } from "react-router-dom";
import MesAnnonces from '../MesAnnonces/MesAnnonces';
import "./MesAnnoncesPage.css";
import NavBarEnt from '../NavBarEnt/NavBarEnt';

const MesAnnoncesPage = () => {
  const location = useLocation();
  const connectedEmployerEmail = location.state?.connectedEmployerEmail;

  // Ajoute un log pour vérifier si l'email est transmis correctement
  console.log('connectedEmployerEmail dans MesAnnoncesPage:', connectedEmployerEmail);

  return (
    <div>
      <NavBarEnt />
      <h1>Mes Annonces</h1>
      <MesAnnonces connectedEmployerEmail={connectedEmployerEmail} />
    </div>
  );
};

export default MesAnnoncesPage;
