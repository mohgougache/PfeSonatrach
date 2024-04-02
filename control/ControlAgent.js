import  agent from "../module/agent.js";

class AgentControl{
    static async ajoutAgent(req, res) {
        
        try {
            let x = await agent.addAgent(
               req.body
            );
    
            
            if (x == true) {
                res.send("Successfully");
            } else {
                res.send("Failed");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'agent :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout de l'agent" });
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