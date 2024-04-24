import  agent from "../module/agent.js";
import email from "../module/email.js";

class AgentControl{
    
       static async insertAgentWithPostes(req, res) {
        try {
            const agentData = req.body;
            const postesData = req.body.postes;
    
            // Insérer l'agent
            const agentId = await new Promise((resolve, reject) => {
                agent.insertAgent(agentData, (error, agentId) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion de l'agent :", error);
                        reject("Erreur lors de l'insertion de l'agent");
                    } else {
                        resolve(agentId);
                    }
                });
            });
    
            const postesWithAgentId = postesData.map(poste => ({ ...poste, IdA: agentId }));
            await new Promise((resolve, reject) => {
                agent.insertPostes(postesWithAgentId, (error) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des postes :", error);
                        reject("Erreur lors de l'insertion des postes");
                    } else {
                        resolve();
                    }
                });
            });
    
            res.status(201).json({ message: 'Agent inséré avec succès avec ses postes associés' });
        } catch (error) {
            res.status(500).json({ error });
        }
       }

       static async selctALLagent(req,res){
        let results = await agent.getagentall();
        if(results){
            res.json(results);
           console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }

       static async selctagent(req,res){
        console.log(req.body);
        const idA = req.body?.IdA;
        let results = await agent.getagent(idA);
        if(results){
            res.status(200).json(results);
            console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }

       static async selctAgent2(req,res){
        
        let results = await agent.getAgent();
        if(results){
            res.status(200).json(results);
            console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }
       
    //    static async supAgent(req,res){
    //         const idA=req.body.IdA;
    //     var x= await agent.delltAgent(idA);
    //     if(x==true){
    //      res.send("seuccessfully")
    //  }else {
    //      res.send("error");
    //  }
    //    }

       static updateAgentAddPoste(req, res) {
        const { agentId, agentData, posteData } = req.body;
    
        agent.updateAgentAndPoste(agentId, agentData, posteData, (error) => {
            if (error) {
                return res.status(500).json({ error: "Erreur lors de la mise à jour de l'agent et de l'ajout du poste" });
            }
    
            res.status(200).json({ message: 'Agent modifié avec succès et nouveau poste ajouté' });
        });
       }
    
       static deleteAgent(req, res) {
    const agentId = req.params.IdA;

    agent.suppAgent(agentId, (error) => {
      if (error) {
        console.error("Erreur lors de la suppression de l'agent et de ses postes :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'agent et de ses postes" });
      } else {
        res.status(200).json({ message: 'Agent et ses postes associés supprimés avec succès' });
      }
    });
       }
       static async envoyerEmailEtInsert(req, res) { 
        console.log(req.body);
        const { ...Data } = req.body;
        try {
          const resultE = await agent.selectEmail(Data.IdA); // Appel de la méthode statique selectEmail
          const resultI = await agent.insertRDV(Data); // Appel de la méthode statique insertRDV
          if (resultE && resultE.length > 0 && resultI) {
            res.status(200).json({ resultE, resultI }); // Correction de la réponse JSON
            console.log(resultE);
            email.email(resultE[0].Email, "visite periodice", "control/mail.html"); // Appel correct de la méthode pour envoyer l'e-mail
          } else if (!resultE) {
            res.status(401).json({ error: "Il n'existe pas d'agent avec cet identifiant" });
          } else if (!resultI) {
            res.status(401).json({ error: "Il n'est pas insert" }); 
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          res.status(500).json({ error: "Erreur interne lors de l'envoi de l'e-mail" });
        }
      }
      static async selcectRdv(req,res){
        // const IdA= req.params.IdA;
        const Date= req.body.Date
        let results = await agent.getRendevous(Date);
        if(results){
            res.json(results);
           console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }
      static async deleteRdv(req,res){
        const IdR= req.params.IdR;
        let result = await agent.supRdv(IdR);
        if(result){
            res.json(result);
           console.log(result);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit"})
        }
    
    } 
    static async updateRdv(req, res) {
        const RdvData = req.body.RdvData;  
        let results = await agent.modifieRdv(RdvData); // Appel correct de la méthode modifieRdv
        if (results) {
            res.json(results);
            console.log(results);
        } else {
            res.status(401).json({ error: "Il y a un problème dans la requête" });
        }
    }
    

}
  export default  AgentControl;