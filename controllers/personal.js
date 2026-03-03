const { request, response } = require("express");
const { Personal } = require("../models");
const { Op } = require("sequelize");

const mostrarPersonales = async (req = request, res = response) => {
  try {
    const { estado, buscar = "", page = 1, limit = 10 } = req.query;
    const pagina = parseInt(page==0?1:page);
    const limite = parseInt(limit);
    const offset = (pagina - 1) * limite;
    const { count, rows } = await Personal.findAndCountAll({
      where: {
        estado,
        [Op.or]: [
          {
            dni: {
              [Op.like]: `%${buscar}%`
            }
          },
          {
            nombre: {
              [Op.like]: `%${buscar}%`
            }
          },
          {
            apellido: {
              [Op.like]: `%${buscar}%`
            }
          },
          {
            escalafon: {
              [Op.like]: `%${buscar}%`
            }
          }
        ]
      },
      limit: limite,
      offset: offset,
      order: [["id", "DESC"]] // opcional pero recomendado
    });
    res.json({
      ok: true,
      msg: "Se muestran correctamente los datos",
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

const mostrarIdPersonal = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Personal.findOne({
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

const agregarPersonal = async (req = request, res = response) => {
  try {
    const { dni, nombre, apellido, escalafon, fechainicio, ...data } = req.body;
    data.dni = dni;
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    data.escalafon = escalafon;
    data.fecha_inicio = fechainicio.toUpperCase();

    const resp = await Personal.create(data);

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

const modificarPersonal = async (req = request, res = response) => {
  try {
    const { dni, nombre, apellido, escalafon, fechainicio, ...data } = req.body;
    const { id } = req.params;
    data.dni = dni;
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    data.escalafon = escalafon;
    data.fecha_inicio = fechainicio.toUpperCase();

    const resp = await Personal.update(data, {
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

const eliminarPersonal = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    const data = {
      estado,
    };
    const resp = await Personal.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg:
        estado === "1"
          ? "Se habilito el personal con exito"
          : "Se deshabilito el personal con exito",
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
  mostrarPersonales,
  mostrarIdPersonal,
  agregarPersonal,
  modificarPersonal,
  eliminarPersonal,
};
