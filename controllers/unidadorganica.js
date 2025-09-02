const { request, response } = require("express");
const { UnidadOrganica, Organo } = require("../models");

const mostrarUnidadOrganicas = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const resp = await UnidadOrganica.findAll({
      where:{
        estado,
      },
      include: [
        {
          model: Organo,
        },
      ],
    });
    res.json({
      ok: true,
      msg: "Se muestran las unidades organicas con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const mostrarIdUnidadOrganica = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await UnidadOrganica.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Id se muestran los datos correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const agregarUnidadOrganica = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await UnidadOrganica.create(data);
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


const modificarUnidadOrganica = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {nombre, sigla, ...data} = req.body;
    data.nombre= nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await UnidadOrganica.update(data,{
      where:{
        id
      }
    } );

    res.json({
      ok: true,
      ms:'Se actulizo los datos con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const eliminarUnidadOrganica = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} = req.query;
    const data = {
      estado
    }
    const resp = await UnidadOrganica.update(data,{
      where:{
        id
      }
    })
    res.json({
      ok: true,
      msg: (estado === '1')?"Se habilito unidad organica con exito":"Se deshabilito unidad organica con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


module.exports = {
  mostrarUnidadOrganicas,
  mostrarIdUnidadOrganica,
  agregarUnidadOrganica,
  modificarUnidadOrganica,
  eliminarUnidadOrganica,
};
