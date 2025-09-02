const { Router } = require("express");
const { postLogin, resetPassword } = require("../controllers/auth");
const { validarCampos, validarJWT } = require("../middlewares");
const router = Router();

router.post('', postLogin);
router.put('/password',[
    validarJWT,
    validarCampos
],resetPassword)

module.exports = router;