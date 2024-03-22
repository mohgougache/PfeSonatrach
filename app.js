const express= require("express");
const session= require("express-session");
const bodyParser= require("body-parser");
const router= require("./router/router.js");
const connection= require("./baseDonne/connection");
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
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