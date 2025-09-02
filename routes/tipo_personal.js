const { Router } = require("express");
const { mostrarTipoPersonal } = require("../controllers/tipo-personal");


const router = Router();


router.get('',mostrarTipoPersonal);



module.exports = router;