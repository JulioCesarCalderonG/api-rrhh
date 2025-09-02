const { Router } = require("express");
const { check } = require("express-validator");
const { getMenus, getMenu, postMenu, putMenu, deleteMenu, getNavigation } = require("../controllers/menu");
const { validarCampos, validarJWTAdmin, validarJWTUsuario } = require("../middlewares");
const { validarNombreMenu, validarTituloMenu, validarNombreExisteMenu, validarTituloExisteMenu } = require("../helpers/db-validators");



const router = new Router();

router.get("", getMenus);
router.get("/:id", getMenu);
router.get("/mostrar/menu",[
    validarJWTUsuario,
    validarCampos
], getNavigation);
router.post("", [
    validarJWTAdmin,
    check("nomMenu", "El nombre del menu es obligatorio").not().isEmpty().custom(validarNombreMenu),
    check("titulo", "El titulo del menu es obligatorio").not().isEmpty().custom(validarTituloMenu),
    validarJWTAdmin,
    validarCampos,
], postMenu);
router.put("/:id", [
    validarJWTAdmin,
    check("nomMenu", "El nombre del menu es obligatorio").not().isEmpty().custom(validarNombreExisteMenu),
    check("titulo", "El titulo del menu es obligatorio").not().isEmpty().custom(validarTituloExisteMenu),
    validarCampos
], putMenu);
router.delete("/:id",[
    validarJWTAdmin,
    validarCampos
], deleteMenu);


module.exports = router;