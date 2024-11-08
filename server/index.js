import express from "express";
import cors from "cors";

const app = express();

// Utilise cors comme middleware
app.use(cors());

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(5000, () => console.log("L'app fonctionne chakal sur le port 5000"));
