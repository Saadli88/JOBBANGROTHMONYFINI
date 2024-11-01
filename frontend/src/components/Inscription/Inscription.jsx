import React, { useState } from "react";
import "./Inscription.css";
import NavBar from '../NavBar/NavBar';
import { useCandidatContext } from "../../hooks/useCandidatContext";
import { useInscriptionCandidat } from "../../hooks/useInscriptionCandidat";
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const Inscription = () => {
  const { dispatch } = useCandidatContext();
  const [nomCandidat, setNomCandidat] = useState('');
  const [emailCandidat, setEmailCandidat] = useState('');
  const [mot_de_passeCandidat, setMDPcandidat] = useState('');
  const { inscriptionCad, error, isLoading } = useInscriptionCandidat();
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    await inscriptionCad(
      nomCandidat,
      emailCandidat,
      mot_de_passeCandidat
    );

    // Redirige vers /cand après l'inscription réussie
    navigate('/cand'); 

    const candidat = {
      nom_candidat: nomCandidat,
      email_candidat: emailCandidat,
      mot_de_passeCandidat: mot_de_passeCandidat
    };

    // Vous pouvez également garder l'objet candidat si vous avez besoin
  }

  return (
    <div>
      <NavBar />
      <div className="inscription-container">
        <h2>Inscription candidat</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom du candidat</label>
            <input
              type="text"
              value={nomCandidat}
              onChange={(e) => setNomCandidat(e.target.value)}
              required
            />
          </div>
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
          <button disabled={isLoading} type="submit" className="submit-btn">S'inscrire</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Inscription;
