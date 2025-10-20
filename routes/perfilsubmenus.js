const { Router } = require("express");
const { check } = require("express-validator");
const { getPerfilSubMenus, getPerfilSubMenu, postPerfilSubMenu, putPerfilSubMenu, deletePerfilSubMenu } = require("../controllers/perfilsubmenu");
const { validarCampos, validarJWTAdmin } = require("../middlewares");
const { validarPerfilSubMenu, validarExistePerfilSubMenu } = require("../helpers/db-validators");



const router = new Router();

router.get("",getPerfilSubMenus);
router.get("/:id",getPerfilSubMenu);
router.post("",[
    validarJWTAdmin,
    check("idPerfil","El perfil es obligatorio").not().isEmpty(),
    check("idSubMenu","El submenu es obligatorio").not().isEmpty(),
    //check(["idPerfil","idSubMenu"]).custom(validarPerfilSubMenu),
    validarCampos
],postPerfilSubMenu);
router.put("/:id",[
    validarJWTAdmin,
    check("idPerfil","El perfil es obligatorio").not().isEmpty(),
    check("idSubMenu","El submenu es obligatorio").not().isEmpty(),
    check(["idPerfil","idSubMenu"]).custom(validarExistePerfilSubMenu),
    validarCampos
],putPerfilSubMenu);
router.post("/eliminar/perfil",[
    validarJWTAdmin,
    validarCampos
],deletePerfilSubMenu);


module.exports = router;