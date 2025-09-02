const { Router } = require("express");
const { mostrarRegimenLaborales, mostrarRegimenLaboralId, guardarRegimenLaboral, modificarRegimenLaboral, eliminarRegimenLaboral, mostrarRegimenLaboralPersonalId } = require("../controllers/regimen-laboral");



const router = Router();


router.get('',mostrarRegimenLaborales);
router.get('/:id',mostrarRegimenLaboralId);
router.get('/personal/:id',mostrarRegimenLaboralPersonalId);
router.post('',guardarRegimenLaboral);
router.put('/:id',modificarRegimenLaboral);
router.delete('/:id',eliminarRegimenLaboral);


module.exports = router;





