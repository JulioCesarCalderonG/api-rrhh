const { Router } = require("express");
const { mostrarTipoLicencia, mostrarIdTipoLicencia, agregarTipoLicencia, editarTipoLicencia, eliminarTipoLicencia } = require("../controllers/tipo-licencia");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { validarNombreTipoLicencia } = require("../helpers");


const router = Router();


router.get('',mostrarTipoLicencia);
router.get('/:id',mostrarIdTipoLicencia);
router.post('',[
    check('nombre').custom(validarNombreTipoLicencia),validarCampos
],agregarTipoLicencia);
router.put('/:id',editarTipoLicencia);
router.delete('/:id',eliminarTipoLicencia);


module.exports = router;