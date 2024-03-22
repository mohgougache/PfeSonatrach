const express= require("express");
const controll= require("../control/controlLogin");
const controlA = require("../control/ControlAgent");
const router = express.Router();

router.post("/login",controll.verficontrol);
router.post("/ajouter",controlA.ajoutAgent);
  

  module.exports=router;