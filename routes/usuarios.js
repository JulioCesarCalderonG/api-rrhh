const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, postLoginUsuario, putUsuarioPassword } = require("../controllers/usuarios");
const { validarCampos, validarJWTAdmin } = require("../middlewares");
const { validarNombreCompleto, validarUsuario, validarExistUsuario, validarExistNombreCompleto } = require("../helpers/db-validators");

const router = new Router();

router.get("",getUsuarios);
router.get("/:id",getUsuario);
router.post("",[
    validarJWTAdmin,
    check("idPerfil", "El perfil es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("user", "El usuario es obligatorio").not().isEmpty().custom(validarUsuario),
    check(["nombre", "apellido"],"El nombre y apellido es obligatorio").not().isEmpty().custom(validarNombreCompleto),
    validarCampos
],postUsuario);
router.post("/login",[
     check(["user", "password"],"El usuario y la contraseña es obligatorio").not().isEmpty(),
    validarCampos
],postLoginUsuario);
router.put("/:id",[
    validarJWTAdmin,
    check("idPerfil", "El perfil es obligatorio").not().isEmpty(),
    check("user", "El usuario es obligatorio").not().isEmpty().custom(validarExistUsuario),
    check(["nombre", "apellido"],"El nombre y apellido es obligatorio").not().isEmpty().custom(validarExistNombreCompleto),
    validarCampos
],putUsuario);
router.put("/password/:id",[
    validarJWTAdmin,
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
],putUsuarioPassword);
router.delete("/:id",[
    validarJWTAdmin,
    validarCampos
],deleteUsuario);


module.exports = router;