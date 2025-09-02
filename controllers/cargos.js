const { request, response } = require("express");
const { Cargo, TipoPersonal } = require("../models");

const mostrarCargos = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const resp = await Cargo.findAll({
      where:{
        estado
      },
      include:[
        {
          model:TipoPersonal
        },
      ],
      order:[
        ['descripcion','ASC']
      ]
    });
    let array=[];
    if (resp) {
      for (let i = 0; i < resp.length; i++) {
        const obj={
          ids:i+1,
          id:resp[i].id,
          descripcion:resp[i].descripcion,
          id_tipo_personal:resp[i].id_tipo_personal,
          estado:resp[i].estado,
          TipoPersonal:resp[i].TipoPersonal,

        }
        array.push(obj);
      }
    }
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp:array,
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
