const agent= require("../module/agent");

class AgentControl{
    static async ajoutAgent(res,req){
        let x=await agent.addAgent(req.body.Division, req.body.Direction, req.body.Unite, req.body.Service, req.body.Atelier,req.body.nom,req.body.prenom,req.body.DateN,req.body.LieuN,req.body.sex,req.body.sitution_famille,req.body.adreese,req.body.GroupwSanguim,req.body.maladie,req.body.NSS,req.body.Scolaire,req.body.Prefessionnelle,req.body.Qprofessionnelle,req.body.ActiProAntet,req.body.ServiceNational)
        if(x==true){
            res.send("seuccessfully")
        }else {
            res.send();
        }
       }
    }
    
module.exports=AgentControl;