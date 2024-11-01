import React from 'react';
import './NavBarEnt.css';
import { Link, useNavigate } from "react-router-dom"; 
import Logo from '../../images/logo.jpg';
import { useEntrepriseLougout } from "../../hooks/useEntrepriseLogout"; // Importez le hook useLogout
import { useEntrepriseContext } from '../../hooks/useEntrepriseContext';
  
const NavBarEnt = () => {
  const navigate = useNavigate();
  const { entreprise } = useEntrepriseContext();
  const { lougoutentreprise } = useEntrepriseLougout();
  const handleClick = () => {
    lougoutentreprise();
    navigate("/"); // Redirige vers l'accueil après la déconnexion
  };


  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <a href="/ent" className="navbar-link navbar-link-bold">Accueil</a>
        </div>

{entreprise &&(
        <div>
        <span>{entreprise.email_entreprise} </span>
        <button onClick={handleClick} className="logoutEnt-button">
            Log out
          </button>{" "}
          {/* Bouton Log out */}
          </div>
          )}
      </div>
    </nav>
  );
};

export default NavBarEnt;
