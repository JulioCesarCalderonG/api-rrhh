

const ValidarCampos = require("./validar-campos");
const ValidarJWT  = require("./validar-jwt");
const ValidarArhivo = require("./validar-archivo");
module.exports={
    ...ValidarCampos,
    ...ValidarJWT,
    ...ValidarArhivo
}