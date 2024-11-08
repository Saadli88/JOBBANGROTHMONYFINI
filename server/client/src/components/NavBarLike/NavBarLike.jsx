import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link pour la navigation
import './NavBarLike.css'; 
import Logo from '../../images/logo.jpg';
import { FaHeart } from 'react-icons/fa'; // Importez l'icône de cœur

const NavBarLike = () => {
  const menuOptions = [
    { text: "Retour", path: "/cand" },
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <Link to="/cand" className="navbar-link navbar-link-bold">Retour</Link>
          <Link to="/like" className="heart2-icon">
            <FaHeart color="white" size={25}/>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarLike;
