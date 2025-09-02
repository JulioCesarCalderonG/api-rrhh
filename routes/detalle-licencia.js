const { Router } = require("express");
const { mostrarDetalleLicenciaTipo, mostrarDetalleLicencia, mostrarIdDetalleLicencia, agregarDetalleLicencia, editarDetalleLicencia, eliminarDetalleLicencia } = require("../controllers/detalle-licencia");
const { check } = require("express-validator");
const { validarNombreDetalleLicencia } = require("../helpers");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('',mostrarDetalleLicencia);
router.get('/:id',mostrarIdDetalleLicencia);
router.get('/tipo/:id',mostrarDetalleLicenciaTipo);
router.post('',[check('nombre').custom(validarNombreDetalleLicencia),validarCampos],agregarDetalleLicencia);
router.put('/:id',editarDetalleLicencia);
router.delete('/:id',eliminarDetalleLicencia);


module.exports = router;