import  agent from "../module/agent.js";

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
            res.send(results);
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
       
       static async supAgent(req,res){
            const idA=req.body.IdA;
        var x= await agent.delltAgent(idA);
        if(x==true){
         res.send("seuccessfully")
     }else {
         res.send("error");
     }
}

static updateAgentAddPoste(req, res) {
    const { agentId, agentData, posteData } = req.body;

   
    agent.updateAgent(agentId, agentData, (error) => {
        if (error) {
            return res.status(500).json({ error: "Erreur lors de la modification de l'agent" });
        }

        // Insérer un nouveau poste pour l'agent
        agent.addPoste(agentId, posteData, (error) => {
            if (error) {
                return res.status(500).json({ error: "Erreur lors de l'ajout du poste" });
            }

            res.status(200).json({ message: 'Agent modifié avec succès et nouveau poste ajouté' });
        });
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
    }
    
  export default  AgentControl;