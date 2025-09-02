const { Router } = require("express");
const { mostrarTipodocumento, agregarTipodocumento, modificarTipodocumento, eliminarTipodocumento, mostrarIdTipodocumento } = require("../controllers/tipodocumento");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarDescripcionTipodocumento } = require("../helpers/db-validators");


const router = Router();

router.get("",mostrarTipodocumento);

router.get("/:id",mostrarIdTipodocumento);

router.post("",[
    check('descripcion').custom(validarDescripcionTipodocumento),
    validarCampos
],agregarTipodocumento);

router.put("/:id",modificarTipodocumento);

router.delete("/:id",eliminarTipodocumento);



module.exports = router;