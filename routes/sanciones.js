const { Router } = require("express");
const { mostrarSanciones } = require("../controllers/sanciones");



const router = Router();

router.get('',mostrarSanciones);


module.exports = router;