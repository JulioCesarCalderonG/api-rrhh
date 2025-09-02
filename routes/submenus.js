const { Router } = require("express");
const { check } = require("express-validator");
const { getSubMenus, getSubMenu, postSubMenu, putSubMenu, deleteSubMenu } = require("../controllers/submenu");
const { validarCampos, validarJWTAdmin } = require("../middlewares");
const { validarTituloSubMenu, validarNombreSubMenu, validarNombreExisteSubMenu, validarTituloExisteSubMenu } = require("../helpers/db-validators");



const router = new Router();

router.get("",getSubMenus);
router.get("/:id",getSubMenu);
router.post("",[
    validarJWTAdmin,
    check("idMenu","El menu es obligatorio").not().isEmpty(),
    check("subMenu","El submenu es obligatorio").not().isEmpty().custom(validarNombreSubMenu),
    check("titulo","El titulo es obligatorio").not().isEmpty().custom(validarTituloSubMenu),
    validarCampos
],postSubMenu);
router.put("/:id",[
    validarJWTAdmin,
    check("idMenu","El menu es obligatorio").not().isEmpty(),
    check("subMenu","El submenu es obligatorio").not().isEmpty().custom(validarNombreExisteSubMenu),
    check("titulo","El titulo es obligatorio").not().isEmpty().custom(validarTituloExisteSubMenu),
    validarCampos
],putSubMenu);
router.delete("/:id",[
    validarJWTAdmin,
    validarCampos
],deleteSubMenu);


module.exports = router;