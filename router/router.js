import express from 'express';
import controll from "../control/controlLogin.js";
import controlA from "../control/ControlAgent.js";

const router = express.Router();

router.post("/api/login", controll.verficontrol);
router.post("/api/ajouter", controlA.ajoutAgent);
router.get("/api/agentall", controlA.selctALLagent);
router.get("/api/agent", controlA.selctagent);

export default router;
