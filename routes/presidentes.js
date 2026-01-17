const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { getPresidentes, getPresidente, postPresidente, putPresidente, deletePresidente } = require("../controllers/presidentes");
const { validarNombrePresidente, validarDNIPresidente } = require("../helpers");


const router= Router();

router.get("",getPresidentes);
router.get("/:id",getPresidente);
router.post("",[
    check('nombre',"El nombre es obligatorio").not().isEmpty().custom(validarNombrePresidente),
    check('dni',"El DNI es obligatorio").not().isEmpty().custom(validarDNIPresidente),
    check('resDesignado',"La resolucion designado es obligatorio").not().isEmpty(),
    check('resAdminUno',"La resolucion administrativo es obligatorio").not().isEmpty(),
    check('resAdminDos',"La resolucion administrativo es obligatorio").not().isEmpty(),
    check('fechaDesignado',"La fecha de desiganacion administrativo es obligatorio").not().isEmpty(),
    check('fechaAdminUno',"La fecha de administrativo uno es obligatorio").not().isEmpty(),
    check('fechaAdminDos',"La fecha de administrativo dos es obligatorio").not().isEmpty(),
    validarCampos
],postPresidente);
router.put("/:id",putPresidente);
router.delete("/:id",deletePresidente);

module.exports = router;

