const { request, response } = require("express");
const { Dependencia } = require("../models");

const mostrarDependencias = async (req = request, res = response) => {
  const resp = await Dependencia.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};


const mostrarIdDependencia = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await Dependencia.findOne({
     where:{
       id
     }
   });
   res.json({
     ok: true,
     msg: 'Id se muestran los datos correctamente',
     resp,
   });
  } catch (error) {
   res.status(400).json({
     ok:false,
     msg:`Error:${error}`
   })
  }
 };



const agregarDependencias = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Dependencia.create(data);

    res.json({
      ok: true,
      msg: "Datos ingresados correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarDependencias = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    const { id } = req.params;

    data.descripcion = descripcion.toUpperCase();

    const resp = await Dependencia.update(data, {
      where: {
        id,
      },
    });

    res.json({
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarDependencias = (req = request, res = response) => {};

module.exports = {
  mostrarDependencias,
  agregarDependencias,
  modificarDependencias,
  eliminarDependencias,
  mostrarIdDependencia,
};
