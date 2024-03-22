const db=require("../baseDonne/connection");
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
    static async selectAgent(nom,prenom,Nss){
        return new Promise(resolve => {
            db.query("select * from agent WHERE Nom = ? AND Prenom = ? AND NSS + ?", [nom, prenom,Nss],(error,result)=>{
                if(!error){
                    resolve(result);
                }
                if(error){
                    console.log(error);
                }
            })
        })
    }

    
}
module.exports=AgentModule;