import React from 'react';
import { EmploiList } from '../../data/emploi'; // Assurez-vous que ce chemin est correct
import EmploiItem from '../EmploiItem/EmploiItem'; // Importez le composant qui affiche un emploi
import NavBarLike from '../NavBarLike/NavBarLike'; // Importez le composant NavBar
import './PostesLiker.css';

const PostesLiker = ({ likedJobs }) => {
  // Filtrez les emplois aimés
  const likedJobDetails = EmploiList.filter(emploi => likedJobs.has(emploi.nom_poste));

  return (
    <div>
      <NavBarLike /> {/* Ajout de la barre de navigation */}
      <div className="titre-like">
        Postes Aimés
      </div>
      <div className="liked-jobs-container">
        {likedJobDetails.length > 0 ? (
          likedJobDetails.map((emploi) => (
            <div key={emploi.nom_poste} className="liked-job-card">
              <EmploiItem 
                searchTerm="" // Aucun filtre de recherche nécessaire ici
                location="" // Aucune localisation nécessaire ici
                likedJobs={likedJobs} 
                setLikedJobs={() => {}} // Fonction vide pour éviter les erreurs
                emploi={emploi} // Passez l'objet emploi entier
              />
            </div>
          ))
        ) : (
          <p>Aucun poste aimé.</p>
        )}
      </div>
    </div>
  );
};

export default PostesLiker;
