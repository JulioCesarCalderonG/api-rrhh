const { request, response } = require('express');
const { Sede } = require('../models');

const mostrarSedes = async(req = request, res = response) => {
  try {
    const {estado} = req. query;
    const resp = await Sede.findAll({
      where:{
        estado,
      },
      order:[
        ['nombre','ASC']
      ]
    });
    let array=[];
    if (resp) {
      for (let i = 0; i < resp.length; i++) {
        const obj={
          ids:i+1,
          id:resp[i].id,
          nombre:resp[i].nombre,
          estado:resp[i].estado
        }
        array.push(obj)
      }
    }
    res.json({
      ok: true,
      msg:'Se muestran los datos con exitos',
      resp:array
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const mostrarIdSede = async(req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Sede.findOne({
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


const agregarSede = async(req = request, res = response) => {
  try {
    const { nombre, ...data } = req.body;
    data.nombre = nombre.toUpperCase();

    const resp = await Sede.create(data);

    res.json({
      ok: true,
      msg:'Datos ingresados correctamente',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const modificarSede = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {nombre, ...data} = req.body;
    data.nombre= nombre.toUpperCase();

    const resp = await Sede.update(data,{
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


const eliminarSede = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} =req.query;
    const data = {
      estado,
    }
    const resp = await Sede.update(data,{
      where:{
        id,
      },
    });
    res.json({
      ok: true,
      msg:(estado ==='1')?"Se habilito la sede con exito":"Se deshabilito la sede con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


module.exports = {
  mostrarSedes,
  mostrarIdSede,
  agregarSede,
  modificarSede,
  eliminarSede,
};
