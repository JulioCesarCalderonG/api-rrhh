const { request, response } = require("express");
const { TipoLicencia } = require("../models");

const mostrarTipoLicencia = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const resp = await TipoLicencia.findAll({
        where: {
            estado,
        }
    });
    res.json({
      ok: true,
      msg: "Se muestran los datos correctamente",
     resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdTipoLicencia = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await TipoLicencia.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestran los datos correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const agregarTipoLicencia = async (req = request, res = response) => {
  try {
    const { nombre, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    const resp = await TipoLicencia.create(data);
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

const editarTipoLicencia = async (req = request, res = response) => {
  try {
    const { nombre, ...data } = req.body;
    const { id } = req.params;
    data.nombre = nombre.toUpperCase();
    const resp = await TipoLicencia.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Tipo de licencia actualizado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const eliminarTipoLicencia = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const data = {
      estado,
    };
    const resp = await TipoLicencia.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg:
        estado === "1"
          ? "Se habilito el tipo de licencia"
          : "Se deshabilito el tipo de licencia",
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
  mostrarTipoLicencia,
  mostrarIdTipoLicencia,
  agregarTipoLicencia,
  editarTipoLicencia,
  eliminarTipoLicencia,
};
