const { Router } = require("express");
const { mostrarMeritoPersonal, mostrarMeritoId, guardarMerito, actualizarMerito, eliminarMerito, mostrarMeritoPersonalEscalafon, mostrarMeritoPersonalDni } = require("../controllers/meritos");
const { validarCampos, validarArchivoSubir, validarJWT } = require("../middlewares");


const router = Router();


router.get('/personal/:id',mostrarMeritoPersonal);
router.get("/personal/dni/:dni",mostrarMeritoPersonalDni);
router.get('/:id',mostrarMeritoId);
router.post('',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],guardarMerito);
router.put('/:id',[
    validarJWT,
    validarCampos
],actualizarMerito);
router.delete('/:id',[
    validarJWT,
    validarCampos
],eliminarMerito);

module.exports = router;