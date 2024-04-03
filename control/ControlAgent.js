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

static async modifAgent(req, res) {
    const { IdA } = req.params;
    const newData = req.body;

    try {
        const result = await agent.updateAgent(IdA, newData);
        res.json({ message: 'Agent updated successfully'});
    } catch (error) {
        console.error('Error updating agent:', error);
        res.status(500).json({ error: 'Error updating agent' });
    }
}
    }
    
  export default  AgentControl;