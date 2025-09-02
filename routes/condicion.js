const { Router } = require("express");
const { mostrarCondicion } = require("../controllers/condicion");



const router = Router();


router.get('',mostrarCondicion);


module.exports = router;



