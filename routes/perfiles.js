const { Router } = require("express");
const { check } = require("express-validator");
const { getPerfiles, getPerfil, postPerfil, putPerfil, deletePerfil, getPerfilMenu, getPerfilMenuInclude } = require("../controllers/perfil");
const { validarCampos, validarJWTAdmin } = require("../middlewares");
const { validarNombrePerfil, validarExisteNombrePerfil } = require("../helpers/db-validators");


const router = new Router();

router.get("",getPerfiles);
router.get("/:id",getPerfil);
router.get("/menu/notinclude/:id",[
    validarJWTAdmin,
    validarCampos
],getPerfilMenu);
router.get("/menu/include/:id",[
    validarJWTAdmin,
    validarCampos
],getPerfilMenuInclude);
router.post("",[
    validarJWTAdmin,
    check("nombre","El nombre del perfil es obligatorio").not().isEmpty().custom(validarNombrePerfil),
    validarCampos
],postPerfil);
router.put("/:id",[
    validarJWTAdmin,
    check("nombre","El nombre del perfil es obligatorio").not().isEmpty().custom(validarExisteNombrePerfil),
    validarCampos
],putPerfil);
router.delete("/:id",[
    validarJWTAdmin,
    validarCampos
],deletePerfil);


module.exports = router;