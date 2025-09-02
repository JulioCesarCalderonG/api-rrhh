const { Router } = require('express');
const { mostrarDependencias, agregarDependencias, modificarDependencias, eliminarDependencias, mostrarIdDependencia } = require('../controllers/dependencia');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarDescripcionDependencia } = require('../helpers/db-validators');

const router = Router();

router.get("",mostrarDependencias);

router.get("/:id",mostrarIdDependencia);

router.post("",[
    check('descripcion').custom(validarDescripcionDependencia),
    validarCampos
],agregarDependencias);

router.put("/:id",modificarDependencias);

router.delete("",eliminarDependencias);

module.exports = router;