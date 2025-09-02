const { Router } = require("express");
const { mostrarReportes, mostrarReporteID, guardarReporte, actualizarReporte, eliminarReporte, actualizarReporteFirma, mostrarReporteImagen } = require("../controllers/reportes");



const router = Router();


router.get('',mostrarReportes);
router.get('/imagen/:nombre',mostrarReporteImagen);
router.get('/:id',mostrarReporteID);
router.post('',guardarReporte);
router.put('/correo/:id',actualizarReporte);
router.put('/firmar/:id',actualizarReporteFirma);
router.delete('/:id',eliminarReporte);

module.exports = router;