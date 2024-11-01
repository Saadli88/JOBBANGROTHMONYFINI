import React, { useEffect } from 'react'; // Ajout de useEffect
import NavBar from '../NavBar/NavBar';
import './Acceuil.css'; 
import Deco from '../../images/deco.jpg'; // Importation correcte de l'image




const Acceuil = () => {
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => console.log(data.message)) // Ici tu vois la réponse du backend dans la console
      .catch(error => console.error('Erreur:', error));
  }, []);

  //hellooooo git test
  return (
    <div className="home-container">
      <NavBar />
      <div className="main-content">
        <div className="background-container">
        <div className="image-container">
          <img src={Deco} alt="Décoration" className="decor-image" />
        </div>
        </div>
          <div className="steps-container">
            <div className="step-container" data-tooltip="Inscrivez-vous pour créer un compte et connectez-vous pour accéder à toutes les fonctionnalités.">
              <div className="step-number">①</div>
              <div className="step-text">
                <h1>Inscrivez-vous<br />ou<br />connectez-vous</h1>
              </div>
            </div>
            <div className="step-container" data-tooltip="Utilisez la barre de recherche pour trouver les offres d'emploi qui vous intéressent.">
              <div className="step-number">②</div>
              <div className="step-text">
                <h1>Recherchez</h1>
              </div>
            </div>
            
            <div className="step-container" data-tooltip="Postulez aux offres d'emploi que vous avez trouvées en envoyant votre CV et lettre de motivation.">
              <div className="step-number">③</div>
              <div className="step-text">
                <h1>Postulez !</h1>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Acceuil;
