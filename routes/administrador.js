const { Router } = require("express");
const { mostrarAdministradores, agregarAdministradores, modificarAdministradores, eliminarAdministradores, mostrarIdAdministrador } = require("../controllers/administrador");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { validarUsuarioAdministrador } = require("../helpers");


const router = Router();

router.get("",mostrarAdministradores);

router.get("/:id",mostrarIdAdministrador);

router.post("",[
    check('usuario').custom(validarUsuarioAdministrador),
    validarCampos
],agregarAdministradores);

router.put("/:id",modificarAdministradores);

router.delete("/:id",eliminarAdministradores);

module.exports = router;