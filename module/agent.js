import db from "../baseDonne/connection.js"
class AgentModule{
    static async addAgent(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational){
        
        return new Promise(resolve=>{
            db.query("INSERT INTO `agent`(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational],(error,result)=>{
                if(!error){
                    resolve(true);
                }
                if(error){
                    resolve(false);
                }
        
            })
        })
        }
    
    static async getagentall()
    {
     return new Promise(resolve =>{
        db.query("SELECT Nom, Prenom, Sex, DateN, Nss FROM agent  " ,[],(error,result)=>{
            if(!error){
                resolve(result)
            }
            if(error){
                console.log(error);
               resolve(error);
            }
        })
     })
    }
    static async getagent(IdA)
    {
     return new Promise(resolve =>{
        db.query("SELECT * FROM agent WHERE IdA  = ?  " ,[IdA],(error,result)=>{
            if(!error){
                resolve(result)
            }
            if(error){
                console.log(error);
               resolve(error);
            }
        })
     })
    }
    
}
export default AgentModule ;