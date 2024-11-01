import React, { useState } from 'react'; 
import "./Candidat.css";
import NavBarCand from '../NavBarCand/NavBarCand';
import { locations } from '../../data/locations';
import EmploiItem from '../EmploiItem/EmploiItem';
import EmploiDetails from "./EmploiDetails"

export const Candidat = ({ likedJobs, setLikedJobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearchClick = () => {
    setIsSearched(true);
    console.log(`Recherche: ${searchTerm}, Lieu: ${location}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocation('');
    setIsSearched(false);
  };

  

  return (
    <div className="candidat-container">
      <NavBarCand />
      <div className="candidat-titre">Recherchez un emploi</div>
      <br />
      
      <div className="search-bar">
        <div className="input-groupp">
          <input 
            type="text" 
            placeholder="Titre de poste, mots-clés ou entreprise" 
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="input-groupp">
          <select value={location} onChange={handleLocationChange}>
            <option value="">Sélectionnez une ville</option>
            {locations.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSearchClick}>Rechercher</button>
      </div>

      <div className="emploi-results">
        {isSearched && <EmploiItem searchTerm={searchTerm} location={location} likedJobs={likedJobs} setLikedJobs={setLikedJobs} />}
      </div>
    </div>





  );
};

export default Candidat;
