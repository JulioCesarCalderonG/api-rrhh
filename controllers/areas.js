const { request, response } = require("express");
const { Area, UnidadOrganica } = require("../models");


const mostrarAreas = async (req = request, res = response) => {
  try {
    const { estado, buscar = "", page = 1, limit = 10 } = req.query;
    const pagina = parseInt(page==0?1:page);
    const limite = parseInt(limit);
    const offset = (pagina - 1) * limite;
    const { count, rows } = await Area.findAndCountAll({
      where:{
        estado
      },
      include:[
        {
          model: UnidadOrganica,
        },
      ],
      limit:limite,
      offset:offset,
      order:[
        ['nombre','ASC']
      ]
    });
    
    res.json({
      ok: true,
      msg: "Se muestran las areas con exito",
      totalRegistros: count,
      totalPaginas: Math.ceil(count / limite),
      paginaActual: pagina,
      resp: rows
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg: `Error: ${error}`,
    });
  }
};


const mostrarIdArea = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Area.findOne({
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


const agregarArea = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await Area.create(data);
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


const modificarArea = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {nombre, sigla, ...data} = req.body;
    data.nombre= nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await Area.update(data,{
      where:{
        id
      }
    } );

    
    res.json({
      ok: true,
      ms:'Se actulizo los datos con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const eliminarArea = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} = req.query;
    const data = {
      estado
    }
    const resp = await Area.update(data,{
      where:{
        id
      }
    })
    
    res.json({
      ok: true,
      msg: (estado==='1')?'Se habilito el area con exito':'Se deshabilito area con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


module.exports = {
  mostrarAreas,
  mostrarIdArea,
  agregarArea,
  modificarArea,
  eliminarArea,
};
