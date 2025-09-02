const { Router } = require("express");
const { mostrarEstados } = require("../controllers/estados");



const router = Router();

router.get('',mostrarEstados);


module.exports = router;