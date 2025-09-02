const { Organo, UnidadOrganica, Area } = require("../models");




const obtenerDependencia = async (tipo_dependencia,id_dependencia) => {
    let dependencia='';
    switch (tipo_dependencia) {
        case '1':
          const organo = await Organo.findOne({
            where: {
              id: id_dependencia,
            },
          });
          dependencia = organo.nombre;
          break;
        case '2':
          const unidad = await UnidadOrganica.findOne({
            where: {
              id: id_dependencia,
            },
          });
          dependencia = unidad.nombre;
          break;
        case '3':
          const area = await Area.findOne({
            where: {
              id: id_dependencia,
            },
          });
          dependencia = area.nombre;
          break;
        default:
          break;
      }
    return dependencia;
}

module.exports ={
    obtenerDependencia
}