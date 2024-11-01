import React, { useState } from "react";
import "./InscriptionEnt.css";
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; // Pour naviguer après la soumission
import { useEntrepriseContext } from "../../hooks/useEntrepriseContext";
import { useInscriptionEntreprise } from "../../hooks/useInscriptionEntreprise";

const InscriptionEnt = () => {
  const { dispatch } = useEntrepriseContext();
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [nomEmployeur, setNomEmployeur] = useState('');
  const [emailEntreprise, setEmailEntreprise] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [mot_de_passeEntreprise, setMDPentreprise] = useState('');
  const { inscriptionEnt, error, isLoading } = useInscriptionEntreprise();
  const navigate = useNavigate(); // Pour rediriger après l'inscription réussie

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exécutez la fonction d'inscription
    await inscriptionEnt(
      nomEntreprise,
      nomEmployeur,
      emailEntreprise,
      telephone,
      adresse,
      mot_de_passeEntreprise
    );

    // Redirige vers ./ent après l'inscription réussie
    navigate('/ent'); 

    // Vous pouvez aussi garder l'objet entreprise si vous avez besoin
    const entreprise = {
      nom_entreprise: nomEntreprise,
      nom_employeur: nomEmployeur,
      email_entreprise: emailEntreprise,
      telephone: telephone,
      adresse: adresse,
      mot_de_passeEntreprise: mot_de_passeEntreprise
    };
  };

  return (
    <div>
      <NavBar />
      <div className="inscriptionEnt-container">
        <h2>Inscription</h2>
        <p>Employeur</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom de l'entreprise</label>
            <input
              type="text"
              value={nomEntreprise}
              onChange={(e) => setNomEntreprise(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Nom de l'employeur</label>
            <input
              type="text"
              value={nomEmployeur}
              onChange={(e) => setNomEmployeur(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={emailEntreprise}
              onChange={(e) => setEmailEntreprise(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Téléphone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
              pattern="\d{10}" 
              title="Veuillez entrer un numéro de téléphone valide (10 chiffres)"
            />
          </div>
          <div className="input-group">
            <label>Adresse</label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={mot_de_passeEntreprise}
              onChange={(e) => setMDPentreprise(e.target.value)}
              required
            />
          </div>
          <button disabled={isLoading} type="submit" className="submit-btn">S'inscrire</button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default InscriptionEnt;
