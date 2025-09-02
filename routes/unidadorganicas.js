const { Router } = require("express");
const { mostrarUnidadOrganicas, agregarUnidadOrganica, modificarUnidadOrganica, eliminarUnidadOrganica, mostrarIdUnidadOrganica } = require("../controllers/unidadorganica");
const { check } = require("express-validator");
const { validarNombreUnidadOrganica } = require("../helpers");


const router = Router();

router.get('',mostrarUnidadOrganicas);
router.get('/:id',mostrarIdUnidadOrganica);
router.post('',[
    check('nombre').custom(validarNombreUnidadOrganica)
],agregarUnidadOrganica);
router.put('/:id',modificarUnidadOrganica);
router.delete('/:id',eliminarUnidadOrganica);

module.exports = router;