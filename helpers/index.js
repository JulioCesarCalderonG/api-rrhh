const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const Option = require('./option');
const FunFecha = require('./fc-fecha');
const GenerarReporte = require('./generar-reporte');
//const enviarReporte =require("./generar-email");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...Option,
  ...FunFecha,
  ...GenerarReporte,
  //...enviarReporte
};
