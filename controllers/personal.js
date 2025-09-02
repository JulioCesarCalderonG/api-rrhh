const { request, response } = require("express");
const { Personal } = require("../models");
const { Op } = require("sequelize");

const mostrarPersonales = async (req = request, res = response) => {
  try {
    const { estado, buscar } = req.query;
    if (buscar === "") {
      const resp = await Personal.findAll({
        where: {
          estado,
        },
        order:[
          ['nombre','ASC'],
          ['apellido','ASC']
        ]
      });
      let array=[];
      if (resp.length>0) {
        for (let i = 0; i < resp.length; i++) {
          const obj={
            ids:i+1,
            id:resp[i].id,
            dni:resp[i].dni,
            nombre:resp[i].nombre,
            apellido:resp[i].apellido,
            escalafon:resp[i].escalafon,
            fecha_inicio:resp[i].fecha_inicio,
            estado:resp[i].estado
          }          
          array.push(obj)
        }
      }
      return res.json({
        ok: true,
        msg: "Se muestran correctamento los datos",
        resp:array
      });
    }
    const resp = await Personal.findAll({
      where: {
        estado,
        [Op.or]:[
          {
            dni:{
              [Op.startsWith]:`%${buscar}%`
            }
          },
          {
            nombre:{
              [Op.startsWith]:`%${buscar}%`
            }            
          },
          {
            apellido:{
              [Op.startsWith]:`%${buscar}%`
            }
          },
          {
            escalafon:{
              [Op.startsWith]:`%${buscar}%`
            }
          }
        ]
      },
    });
    let array=[];
      if (resp.length>0) {
        for (let i = 0; i < resp.length; i++) {
          const obj={
            ids:i+1,
            id:resp[i].id,
            dni:resp[i].dni,
            nombre:resp[i].nombre,
            apellido:resp[i].apellido,
            escalafon:resp[i].escalafon,
            fecha_inicio:resp[i].fecha_inicio,
            estado:resp[i].estado
          }          
          array.push(obj)
        }
      }
      res.json({
        ok: true,
        msg: "Se muestran correctamento los datos",
        resp:array
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
    const { dni,nombre, apellido, escalafon, fechainicio, ...data } = req.body;
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
