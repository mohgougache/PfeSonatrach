import express from 'express';

import controll from "../control/controlLogin.js"
import controlA from "../control/ControlAgent.js"
const router = express.Router();

router.post("/login",controll.verficontrol);
router.post("/ajouter",controlA.ajoutAgent);
  

export default  router;