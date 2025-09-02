const { Router } = require("express");
const { mostrarPdfRecordLaboral, mostrarPdfLicencia, mostrarPdfVacacional, putPdfVacacional, putPdfLaboral, putPdfLicencia, mostrarPdfMerito, putPdfMerito } = require("../controllers/upload-general");
const { validarCampos, validarArchivoSubir, validarJWT } = require("../middlewares");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);
router.get('/licencia/:nombre',mostrarPdfLicencia);
router.get('/vacacional/:nombre',mostrarPdfVacacional);
router.get('/merito/:nombre',mostrarPdfMerito)
router.put('/vacacional/:id',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],putPdfVacacional);
router.put('/recordlaboral/:id',[
    validarJWT,
    validarArchivoSubir,
    validarCampos,
], putPdfLaboral);
router.put('/licencias/:id', [
    validarJWT,
    validarArchivoSubir,
    validarCampos,
],putPdfLicencia);
router.put('/merito/:id', [
    validarJWT,
    validarArchivoSubir,
    validarCampos,
],putPdfMerito);

module.exports = router;