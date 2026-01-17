const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { getDistritos, getDistrito, postDistrito, putDistrito, deleteDistrito } = require("../controllers/distritos");
const { validarNombreDistrito } = require("../helpers");

const router= Router();

router.get("",getDistritos);
router.get("/:id",getDistrito);
router.post("",[
    check('idDepartamento','El idDepartamento es obligatorio').not().isEmpty(),
    check('nombre',"El nombre del departamento es obligatorio").not().isEmpty().custom(validarNombreDistrito),
    validarCampos
],postDistrito);
router.put("/:id",putDistrito);
router.delete("/:id",deleteDistrito);

module.exports = router;