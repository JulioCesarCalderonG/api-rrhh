const { request, response } = require("express");
const { Tipodocumento } = require("../models");

const mostrarTipodocumento = async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const resp = await Tipodocumento.findAll({
      where: {
        estado,
      },
    });
    let array=[];
    if (resp) {
      for (let i = 0; i < resp.length; i++) {
        const obj={
          ids:i+1,
          id:resp[i].id,
          descripcion:resp[i].descripcion,
          estado:resp[i].estado
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
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdTipodocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Tipodocumento.findOne({
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

const agregarTipodocumento = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    data.descripcion = descripcion.toUpperCase();
    const resp = await Tipodocumento.create(data);
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

const modificarTipodocumento = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    const { id } = req.params;
    data.descripcion = descripcion.toUpperCase();
    const resp = await Tipodocumento.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Personal actualizado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarTipodocumento = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const data = {
      estado,
    };
    const resp = await Tipodocumento.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg:
        estado === "1"
          ? "Se habilito el tipo de documento"
          : "Se deshabilito el tipo de documento",
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
  mostrarTipodocumento,
  agregarTipodocumento,
  modificarTipodocumento,
  eliminarTipodocumento,
  mostrarIdTipodocumento,
};
