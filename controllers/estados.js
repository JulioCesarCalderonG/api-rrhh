const { request, response } = require('express');
const { Estado } = require('../models');

const mostrarEstados = async (req = request, res = response) => {
  try {
    const {estado}=req.query;
    const resp= await Estado.findAll({
        where:{
            estado
        }
    })
    res.json({
      ok: true,
      msg:'Se muestran los estados con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: true,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  mostrarEstados,
};
