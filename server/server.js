import express from 'express'; // Changer require en import
import dotenv from 'dotenv'; 
import offreRoute from './routes/offreEmploi.js';
import CandidatRoute from './routes/candidat.js';
import EntrepriseRoute from './routes/entreprise.js';
import mongoose from 'mongoose';


import path from'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


dotenv.config();
const app = express();


// Middleware pour gérer les requêtes en JSON
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
});

// Route 
app.use('/api/offreEmploi/',offreRoute);
app.use('/api/candidat/',CandidatRoute);
app.use('/api/entreprise/',EntrepriseRoute);

//use cleint app
app.use(express.static(path.join(__dirname, '/client/build')));

//render client
app.get('*', (req, res)=> 
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);


//connexion mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Connecter a mongo db et Backend is running on http://localhost:${process.env.PORT}`);
});
})
.catch((error)=>{
  console.log(error)
});


//app.get()
app.get('/', (req, res) => {
    res.json({mggs: 'Hi .... OHHH!!'}); // Exemple de route
});




