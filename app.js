import express from 'express';
import cors from "cors";
import router from  "./router/router.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
// Middleware pour les routes inconnues
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});


 
    
app.listen(3005, () => { 
  console.log(`Serveur prêt sur le port 3002`);    
});  