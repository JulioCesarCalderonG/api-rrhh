const { Router } = require("express");
const { mostrarOrganos, agregarOrgano, modificarOrgano, eliminarOrgano, mostrarIdOrgano } = require("../controllers/organos");
const { check } = require("express-validator");
const { validarNombreOrgano } = require("../helpers");



const router = Router();

router.get('',mostrarOrganos);
router.get('/:id',mostrarIdOrgano);
router.post('',[
    check('nombre').custom(validarNombreOrgano)
],agregarOrgano);
router.put('/:id',modificarOrgano);
router.delete('/:id',eliminarOrgano);


module.exports = router;