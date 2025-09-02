const { Router } = require("express");
const { mostrarIdHistorial, mostrarHistorial } = require("../controllers/historial");


const router = Router();

router.get('', mostrarHistorial);
//router.get('/:id', mostrarIdHistorial);

module.exports = router;