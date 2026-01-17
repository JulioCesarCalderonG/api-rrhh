const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { getProvincias, getProvincia, postProvincia, putProvincia, deleteProvincia } = require("../controllers/provincias");
const { validarNombreProvincia } = require("../helpers");


const router= Router();

router.get("",getProvincias);
router.get("/:id",getProvincia);
router.post("",[
    check('idDepartamento','El idDepartamento es obligatorio').not().isEmpty(),
    check('nombre',"El nombre del departamento es obligatorio").not().isEmpty().custom(validarNombreProvincia),
    validarCampos
],postProvincia);
router.put("/:id",putProvincia);
router.delete("/:id",deleteProvincia);

module.exports = router;