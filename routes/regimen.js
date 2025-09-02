const { Router } = require("express");
const { mostrarRegimen } = require("../controllers/regimen");



const router = Router();


router.get('',mostrarRegimen);


module.exports = router;