import React from 'react';
import { Link } from 'react-router-dom';  // Importer Link de react-router-dom
import './NavBar.css'; 
import Logo from '../../images/logo.jpg';
import { useCandidatLougout } from '../../hooks/useCandidatLogout';
import { useEntrepriseLougout } from '../../hooks/useEntrepriseLogout';
import { useCandidatContext } from '../../hooks/useCandidatContext';
import { useEntrepriseContext } from '../../hooks/useEntrepriseContext';
const NavBar = () => {

  const { candidat } = useCandidatContext();
  const { entreprise } = useEntrepriseContext();

  const { lougoutcandidat } = useCandidatLougout();
  const { lougoutentreprise } = useEntrepriseLougout();
  const menuOptions = [
    { text: "Connexion", path: "/con" },  // Routes mises à jour pour correspondre aux routes définies dans App.js
    { text: "Entreprise", path: "/conent" },
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <Link to="/" className="navbar-link navbar-link-bold">Accueil</Link>
        </div>

        <div className="navbar-links-container">
          {menuOptions.map((item, index) => (
            <div key={index} className="navbar-item">
              <Link to={item.path} className="navbar-link">{item.text}</Link>
              {/* Bouton de déconnexion pour chaque section, s'affiche uniquement si connecté */}
              {item.text === "Connexion" && candidat && (
                <button onClick={lougoutcandidat} className="logout-button">Log out Candidat</button>
              )}
              {item.text === "Entreprise" && entreprise && (
                <button onClick={lougoutentreprise} className="logout-button">Log out Entreprise</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
