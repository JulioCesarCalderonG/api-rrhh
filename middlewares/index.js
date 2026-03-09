

const ValidarCampos = require("./validar-campos");
const ValidarJWT  = require("./validar-jwt");
const ValidarArhivo = require("./validar-archivo");
const ValidarDatosPersona = require("./datos-persona");
module.exports={
    ...ValidarCampos,
    ...ValidarJWT,
    ...ValidarArhivo,
    ...ValidarDatosPersona
}