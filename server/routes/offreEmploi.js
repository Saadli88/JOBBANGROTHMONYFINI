import express from 'express';
import { 
    creeOffre, 
    avoirOffre,
    avoirOffres,
    supprimerEmploi,
    modifierEmploi } from '../controllers/emploiController.js';
import authMiddlewareEnt from '../middleware/authMiddlewareEnt.js';
import authMiddlewareCan from '../middleware/authMiddlewareCan.js';


const router = express.Router();

router.use(authMiddlewareEnt)
router.use(authMiddlewareCan);


// Routes accessibles uniquement par les candidats
router.get('/', authMiddlewareCan, avoirOffres); // Les candidats peuvent voir toutes les offres
router.get('/:id', [authMiddlewareCan, authMiddlewareEnt], avoirOffre); // Les candidats peuvent voir une offre spécifique

// Routes accessibles uniquement par les entreprises
router.use(authMiddlewareEnt); // Appliquer authMiddlewareEnt uniquement aux routes ci-dessous
router.post('/', creeOffre); // Les entreprises peuvent créer des offres
router.delete('/:id', supprimerEmploi); // Les entreprises peuvent supprimer des offres
router.patch('/:id', modifierEmploi); // Les entreprises peuvent modifier des offres


/*
//avoir toutes les offres
router.get('/', avoirOffres) ;

//avoir une offre
router.get('/:id', avoirOffre);

//cree offre
router.post('/', creeOffre);


//supprimer une offre
router.delete('/:id', supprimerEmploi);

//Modifier une offre
router.patch('/:id', modifierEmploi);
*/
// Assurez-vous d'exporter le routeur
export default router;
