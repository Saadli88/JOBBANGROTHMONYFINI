import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importer useNavigate
import "./Connexion.css";
import NavBar from '../NavBar/NavBar';
import { useConnexionCandidat } from "../../hooks/useConnexionCandidat";

const Connexion = () => {
  const [emailCandidat, setEmailCandidat] = useState('');
  const [mot_de_passeCandidat, setMDPcandidat] = useState('');
  const { connexionCad, error, isLoading } = useConnexionCandidat();
  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    await connexionCad(emailCandidat, mot_de_passeCandidat);
    
    // Si la connexion est réussie, rediriger vers la page Candidat
    if (!error) {
      navigate('/cand');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="connexion-container">
        <h2>Connexion candidat</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={emailCandidat}
              onChange={(e) => setEmailCandidat(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={mot_de_passeCandidat}
              onChange={(e) => setMDPcandidat(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            Se connecter
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="signup">
          <p>Pas de compte avec nous ?</p>
          <a href="/ins">
            <button className="signup-btn">Créer un compte</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
