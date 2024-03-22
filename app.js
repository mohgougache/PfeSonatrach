import express from 'express';
import session from "express-session";
import bodyParser from "body-parser";
import router from  "./router/router.js";
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(
    session({
        secret:'secret_key',
        reserve:true,
        saveUninitialized:true
    })
)
app.use(express.json());
app.use(router);
app.listen(3000,()=>{
    console.log("serveur preet");
});