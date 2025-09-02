const { request, response } = require("express");
const { Organo, Sede } = require("../models");

const mostrarOrganos = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const resp = await Organo.findAll({
      where:{
        estado
      },
      include: [
        {
          model: Sede,
        },
      ],
      order:[
        ['nombre','ASC'],
        ['id_sede','ASC']
      ]
    });
    let array=[];
    if (resp) {
      for (let i = 0; i < resp.length; i++) {
        const obj={
          ids:i+1,
          id:resp[i].id,
          nombre:resp[i].nombre,
          sigla:resp[i].sigla,
          id_sede:resp[i].id_sede,
          estado:resp[i].estado,
          Sede:resp[i].Sede
        }
        array.push(obj);
      }
    }
    res.json({
      ok: true,
      msg: "Se muestran los organos con exito",
      resp:array,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const mostrarIdOrgano = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Organo.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra el organo con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const agregarOrgano = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();
    const resp = await Organo.create(data);
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

const modificarOrgano = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await Organo.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      ms: "Se actulizo los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const eliminarOrgano = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} = req.query;
    const data = {
      estado
    };
    const resp = await Organo.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: (estado === '1')?'Se habilito el organo con exito':'Se deshabilito el organo con exito',
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
  mostrarOrganos,
  mostrarIdOrgano,
  agregarOrgano,
  modificarOrgano,
  eliminarOrgano,
};
