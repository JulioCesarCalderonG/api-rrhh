const { Router } = require("express");
const { getDepartamentos, getDepartamento, postDepartamento, putDepartamento, deleteDepartamento } = require("../controllers/departamento");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { validarNombreDepartamento } = require("../helpers");


const router= Router();

router.get("",getDepartamentos);
router.get("/:id",getDepartamento);
router.post("",[
    check('nombre',"El nombre del departamento es obligatorio").not().isEmpty().custom(validarNombreDepartamento),
    validarCampos
],postDepartamento);
router.put("/:id",putDepartamento);
router.delete("/:id",deleteDepartamento);

module.exports = router;