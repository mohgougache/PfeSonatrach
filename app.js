import express from 'express';
import cors from "cors";
import router from  "./router/router.js";

import bcrypt from 'bcrypt';
const app = express();

app.use(cors());
app.use(express.json());
// const hashedPassword = await bcrypt.hash("Mohamed", 10)
// const match = await bcrypt.compare("Mohamed", hashedPassword);
// console.log(match);
app.use(router);
// Middleware pour les routes inconnues
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
// email.email("deboubmerzak@gmail.com","Convocation rdv","./mail.html");

 
    
app.listen(3002, () => { 
  console.log(`Serveur prêt sur le port 3002`);   
}); 