const {Router} = require('express');
const { mostrarGeneral, agregarGeneral, modificarGeneral, eliminarGeneral, mostrarIdGeneral, mostrarGeneralPersonal, mostrarGeneralPersonalEscalafon, mostrarGeneralPersonalDni } = require('../controllers/general');
const { validarCampos, validarArchivoSubir, validarArchivoSubirDos, validarJWT } = require('../middlewares');


const router = Router();

router.get("",mostrarGeneral);

router.get("/personal/:id",mostrarGeneralPersonal);
router.get("/personal/dni/:dni",mostrarGeneralPersonalDni);

router.get("/:id",mostrarIdGeneral);

router.post("",[
    validarJWT,
    validarArchivoSubirDos,
    validarCampos
],agregarGeneral);

router.put("/:id",[
    validarJWT,
    validarCampos
],modificarGeneral);

router.delete("/:id",[
    validarJWT,
    validarCampos
],eliminarGeneral);

module.exports = router;

