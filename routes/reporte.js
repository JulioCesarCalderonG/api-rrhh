const { Router } = require('express');
const {
  postRecordLaboral,
  mostrarReporteRecordLaboral,
  postRecordLaboralPersona,
  postLicenciaPersona,
  mostrarLicenciaLaboral,
  postMeritoPersona,
  mostrarMerito,
  postVacacionalPersona,
  mostrarVacacional,
  postVacacionalGeneral,
} = require('../controllers/reporte');

const router = Router();

router.post('/recordlaboral', postRecordLaboral);
router.post('/recordlaboral/personal/:id', postRecordLaboralPersona);
router.post('/licencia/personal/:id', postLicenciaPersona);
router.post('/merito/personal/:id', postMeritoPersona);
router.post('/vacacional/personal/:id', postVacacionalPersona);
router.post('/vacacional/general',postVacacionalGeneral);
router.get('/recordlaboral/:nombre', mostrarReporteRecordLaboral);
router.get('/licencia/:nombre', mostrarLicenciaLaboral);
router.get('/merito/:nombre', mostrarMerito);
router.get('/vacacional/:nombre', mostrarVacacional);
module.exports = router;
