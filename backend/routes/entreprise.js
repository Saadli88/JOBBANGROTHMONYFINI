import express from 'express';
import {loginEntreprise,inscriptionEntreprise } from '../controllers/entrepriseController.js';
const router = express.Router();

//connexion
router.post('/loginEntreprise',loginEntreprise)

//inscription
router.post('/inscriptionEntreprise', inscriptionEntreprise)


export default router;