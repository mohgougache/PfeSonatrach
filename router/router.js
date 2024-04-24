import express from 'express';
import controll from "../control/controlLogin.js";
import controlA from "../control/ControlAgent.js";

const router = express.Router();

router.post("/api/login", controll.verficontrol);
router.post("/api/ajouter", controlA.insertAgentWithPostes);
router.get("/api/agentall", controlA.selctALLagent);
router.get("/api/agent1", controlA.selctagent);
router.get("/api/agent2", controlA.selctAgent2);
router.delete("/api/supagent/:IdA", controlA.deleteAgent);
router.put("/api/modifagent", controlA.updateAgentAddPoste);
router.post("/api/convocation", controlA.envoyerEmailEtInsert); 
router.get("/api/selctRdv",controlA.selcectRdv);
router.delete("/api/suprdv/:IdR", controlA.deleteRdv);
router.put("/api/modifRdv", controlA.updateRdv);
// router.post("/api/envemail", controlA.envoyerEmailEtInsert);
export default router;
