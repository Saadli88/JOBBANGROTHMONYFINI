import React, { useState } from "react";
import "./ConnexionEnt.css";
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; // Pour naviguer après la connexion
//import { EmployersList } from '../../data/employers'; //// Assurez-vous que le chemin est correct
import { useConnexionEntreprise } from "../../hooks/useConnexionEntreprise";

//import { useEntrepriseContext } from "../../hooks/useEntrepriseContext";


const ConnexionEnt = () => {
 // const {dispatch} = useEntrepriseContext()
  const navigate = useNavigate();
  const [emailEntreprise, setEmailEntreprise]= useState('')
  const [mot_de_passeEntreprise,setMDPentreprise]= useState('')
  const {connexionEnt, error, isLoading} = useConnexionEntreprise()

 


    const handleSubmit = async (e) => {
      e.preventDefault();
      await connexionEnt(emailEntreprise, mot_de_passeEntreprise);
      
      // Si la connexion est réussie, rediriger vers la page Candidat
      if (!error) {
        navigate('/ent');
      }
    };

  return (

    <div>
      <NavBar />
      <div className="connexion-container">
        <h2>Connexion</h2>
        <p>Employeur</p>
        <form onSubmit={handleSubmit}>
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
            <label>Mot de passe</label>
            <input
              type="password"
              value={mot_de_passeEntreprise}
              onChange={(e) => setMDPentreprise(e.target.value)}
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
          <br />
          <a href="./inscent">
            <button className="signup-btn">Créer un compte</button>
          </a>
        </div>

      </div>
    </div>

  )
}

export default ConnexionEnt;






/*



function ConnexionEnt() {
  const [userType] = useState("Employeur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const navigate = useNavigate(); // Pour rediriger après la connexion réussie

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifiez si l'email est dans la liste des employeurs
    const employer = EmployersList.find(emp => emp.email === email && emp.password === password);
  
    if (employer) {
      console.log(`Logging in as ${userType} with email: ${email}`);
      // Si l'authentification est réussie, rediriger vers la page entreprise avec l'email
      navigate('/ent', { state: { connectedEmployerEmail: email } }); // Passe l'email ici
    } else {
      setErrorMessage("Email ou mot de passe incorrect."); // Définir le message d'erreur
    }
  };
  

  return (
    <div>
      <NavBar />
      <div className="connexion-container">
        <h2>Connexion</h2>
        <p>Employeur</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button className="login-btn"type="submit">Se connecter</button>
   *//*
         {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher le message d'erreur */
      /*
         </form>

        
        <div className="signup">
          <p>Pas de compte avec nous ?</p>
          <br />
          <a href="./inscent">
            <button className="signup-btn">Créer un compte</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConnexionEnt;
***/