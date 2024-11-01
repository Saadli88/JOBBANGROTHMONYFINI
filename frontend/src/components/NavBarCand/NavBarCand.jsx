import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBarCand.css";
import Logo from "../../images/logo.jpg";
import { FaHeart } from "react-icons/fa";
import { useCandidatLougout } from "../../hooks/useCandidatLogout";
import { useCandidatContext } from "../../hooks/useCandidatContext";

const NavBarCand = () => {
  const { candidat } = useCandidatContext();
  const { lougoutcandidat } = useCandidatLougout();
  const navigate = useNavigate();

  const handleClick = () => {
    lougoutcandidat();
    navigate("/"); // Redirige vers l'accueil après la déconnexion
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <Link to="/" className="navbar-link navbar-link-bold">
            Accueil
          </Link>
          <Link to="/like" className="heart2-iconn">
            <FaHeart color="white" size={25} />
          </Link>

    
          {candidat && (
            <div className="candidat-info"> 
              <span className="candidat-email">{candidat.email_candidat}</span>
              <button onClick={handleClick} className="logout-button">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBarCand;
