const { Router } = require("express");
const { mostrarPersonales, agregarPersonal, modificarPersonal, eliminarPersonal, mostrarIdPersonal } = require("../controllers/personal");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarEscalafonPersonal, validarNombrePersonal, validarApellidoPersonal, validarDniPersonal } = require("../helpers/db-validators");


const router = Router();

router.get("", mostrarPersonales);

router.get("/:id",mostrarIdPersonal);

router.post("",[
    check('dni').custom(validarDniPersonal),
    check('escalafon').custom(validarEscalafonPersonal),
    validarCampos
],agregarPersonal);

router.put("/:id",modificarPersonal);

router.delete("/:id",eliminarPersonal);


module.exports = router;