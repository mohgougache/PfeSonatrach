const db=require("../baseDonne/connection");
class logModele{


static async verfie(id,password)
{
 return new Promise(resolve =>{
    db.query('SELECT * FROM profil WHERE id = ? AND password = ?', [id, password],(error,result)=>{
        if(!error){
            resolve(result);
        }
        if(error){
            console.log(error);
        }
    })
 })
}}
module.exports=logModele;
