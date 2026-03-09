const { request, response } = require("express");
const { Organo, Sede } = require("../models");

const mostrarOrganos = async (req = request, res = response) => {
  try {
    const { estado, buscar = "", page = 1, limit = 10 } = req.query;
    const pagina = parseInt(page==0?1:page);
    const limite = parseInt(limit);
    const offset = (pagina - 1) * limite;
    const { count, rows } = await Organo.findAndCountAll({
      where:{
        estado
      },
      include: [
        {
          model: Sede,
        },
      ],
      limit: limite,
      offset: offset,
      order:[
        ['nombre','ASC'],
        ['id_sede','ASC']
      ]
    });
    
    res.json({
      ok: true,
      msg: "Se muestran los organos con exito",
      totalRegistros: count,
      totalPaginas: Math.ceil(count / limite),
      paginaActual: pagina,
      resp: rows
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
