const { Router } = require("express");
const { mostrarCargos, agregarCargo, modificarCargo, eliminarCargo, mostrarIdCargo, mostrarTipoPersonalId } = require("../controllers/cargos");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarDescripcionCargo } = require("../helpers/db-validators");


const router = Router();

router.get("",mostrarCargos);

router.get("/:id",mostrarIdCargo);
router.get("/tipopersonal/:id",mostrarTipoPersonalId);

router.post("",[
    validarCampos
],agregarCargo);

router.put("/:id",modificarCargo);

router.delete("/:id",eliminarCargo);



module.exports = router;