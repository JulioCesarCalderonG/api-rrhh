const { Router } = require("express");
const { mostrarSedes, agregarSede, modificarSede, eliminarSede, mostrarIdSede } = require("../controllers/sedes");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { validarNombreSede } = require("../helpers");




const router = Router();


router.get('',mostrarSedes);
router.get('/:id',mostrarIdSede);
router.post('',[
    check('nombre').custom(validarNombreSede),
    validarCampos
],agregarSede);
router.put('/:id',modificarSede);
router.delete('/:id',eliminarSede);



module.exports = router;