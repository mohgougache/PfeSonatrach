import db from "../baseDonne/connection.js"
class AgentModule{
    static async addAgent(data){
       
        return new Promise(resolve=>{
            db.query("INSERT INTO `agent`(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[data.Division, data.Direction, data.Unite, data.Service, data.Atelier, data.Nom, data.Prenom, data.DateN, data.LieuN, data.Sex, data.SitutionFamille, data.Adreese, data.GroupeSanguim, data.Allergie, data.Nss, data.Scolaire, data.Professionnelle, data.Qprofessionnelle, data.ActiProAntet, data.ServiceNational],(error,result)=>{
                if(!error){
                    resolve(true);
                }
                if(error){
                    resolve(false);
                    console.log(error);
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
        return new Promise((resolve) => {
            db.query(
              "SELECT * FROM agent WHERE IdA= ?  ",
              [IdA],
              (error, result) => {
                if (!error) {
                  resolve(result);
                  console.log( resolve(result));
                }
                if (error) {
                  console.log(error);
                }
              }
            );
      
          });
    }
    static async delltAgent(id){
        return new Promise(resolve=>{
         db.query("DELETE FROM agent WHERE IdA=?",[id],(error,result)=>{
             if(!error){
                resolve(true)
             } else 
             resolve(false);
         })
        })
     } 
     static updateAgent(IdA, newData) {
        return new Promise((resolve, reject) => {
            const { Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational } = newData;
            const sql = `UPDATE agent SET Division=?, Direction=?, Unite=?, Service=?, Atelier=?, Nom=?, Prenom=?, DateN=?, LieuN=?, Sex=?, SitutionFamille=?, Adreese=?, GroupeSanguim=?, Allergie=?, Nss=?, Scolaire=?, Professionnelle=?, Qprofessionnelle=?, ActiProAntet=?, ServiceNational=? WHERE IdA=?`;

            db.query(sql, [Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational, IdA], (err, result) => {
                if (err){
                 reject(err);}
                 else{
                resolve(result);}
            });
        });
    }
}
export default AgentModule ;