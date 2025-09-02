const { Router } = require("express");
const { mostrarAreas, agregarArea, modificarArea, eliminarArea, mostrarIdArea } = require("../controllers/areas");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarNombreArea, validarSiglaArea } = require("../helpers/db-validators");


const router = Router();


router.get("",mostrarAreas);
router.get("/:id",mostrarIdArea);
router.post("",[
    check('nombre').custom(validarNombreArea),
    check('sigla').custom(validarSiglaArea),
    validarCampos
],agregarArea);

router.put("/:id",modificarArea);
router.delete("/:id",eliminarArea);

module.exports = router;