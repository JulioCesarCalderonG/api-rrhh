const { request, response } = require("express");
const { Cargo, TipoPersonal } = require("../models");

const mostrarCargos = async (req = request, res = response) => {
  try {
      const { estado, buscar = "", page = 1, limit = 10 } = req.query;
    const pagina = parseInt(page==0?1:page);
    const limite = parseInt(limit);
    const offset = (pagina - 1) * limite;
    const { count, rows }= await Cargo.findAndCountAll({
      where:{
        estado
      },
      include:[
        {
          model:TipoPersonal
        },
      ],
      limit: limite,
      offset: offset,
      order:[
        ['descripcion','ASC']
      ]
    });
   
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    totalRegistros: count,
      totalPaginas: Math.ceil(count / limite),
      paginaActual: pagina,
      resp: rows
  });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error: ${error}`,
    });
  }
};


const mostrarIdCargo = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Cargo.findOne({
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

const mostrarTipoPersonalId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Cargo.findAll({
      where: {
        id_tipo_personal:id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const agregarCargo = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Cargo.create(data);

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

const modificarCargo = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    const { id } = req.params;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Cargo.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "Se actualizao los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarCargo = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const data = {
      estado,
    };
    const resp = await Cargo.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg:
      estado === '1'? "Se habilito el cargo con exito":"Se deshabilito el cargo con exito",
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
  mostrarCargos,
  mostrarIdCargo,
  mostrarTipoPersonalId,
  agregarCargo,
  modificarCargo,
  eliminarCargo,
};
