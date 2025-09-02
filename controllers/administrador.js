const { request, response } = require("express");
const { Administrador } = require("../models");

const mostrarAdministradores = async (req = request, res = response) => {
  try {
    const { activo } = req.query;
    const resp = await Administrador.findAll({
      where: {
        activo,
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
      msg: `Error: ${error}`,
    });
  }
};

const agregarAdministradores = async (req = request, res = response) => {
  try {
    const {nombre,apellido,...data} = req.body;
    data.nombre=nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    const resp = await Administrador.create(data);
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

const modificarAdministradores = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {nombre,apellido,...data} = req.body;
    data.nombre=nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    const resp = await Administrador.update(data, {
      where: {
        id,
      },
    });

    res.json({
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const mostrarIdAdministrador = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Administrador.findOne({
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

const eliminarAdministradores = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { activo } = req.query;
    const data = {
      activo,
    };
    const resp = await Administrador.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg:
        activo === "1"
          ? "Se habilito el administrador con exito"
          : "Se deshabilito el administrador con exito",
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
  mostrarAdministradores,
  agregarAdministradores,
  modificarAdministradores,
  eliminarAdministradores,
  mostrarIdAdministrador,
};
