import db from "../baseDonne/connection.js"
class AgentModule{
    static insertAgent(agentData, callback) {
        db.query("INSERT INTO `agent`(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [agentData.Division, agentData.Direction, agentData.Unite, agentData.Service, agentData.Atelier, agentData.Nom, agentData.Prenom, agentData.DateN, agentData.LieuN, agentData.Sex, agentData.SitutionFamille, agentData.Adreese, agentData.GroupeSanguim, agentData.Allergie, agentData.Nss, agentData.Scolaire, agentData.Professionnelle, agentData.Qprofessionnelle, agentData.ActiProAntet, agentData.ServiceNational], (error, agentResult) => {
            if (error) {
                console.error("Erreur lors de l'insertion de l'agent :", error);
                callback(error, null);
            } else {
                callback(null, agentResult.insertId);
            }
        });
    }
    
    static insertPostes(postesData, callback) {
        const values = postesData.map(poste => [poste.Poste, poste.DateD, poste.DateF, poste.RisqueProfess, poste.Motifs, poste.IdA]);

db.query('INSERT INTO postes (Poste, DateD, DateF, RisqueProfess, Motifs, IdA) VALUES ?', [values], (error, postesResult) => {
    if (error) {
        console.error("Erreur lors de l'insertion des postes :", error);
        callback(error);
    } else {
        callback(null);
    }
});

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