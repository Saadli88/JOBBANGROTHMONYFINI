import express from 'express';
import { loginCandidat, signupCandidat } from '../controllers/candidatController.js'; 
const router = express.Router();

// Connexion
router.post('/loginCandidat', loginCandidat);

// Inscription
router.post('/signupCandidat', signupCandidat);

export default router;
