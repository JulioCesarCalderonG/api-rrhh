const { request, response } = require("express");
const { Perfil, Menu, SubMenu, PerfilSubMenu } = require("../models");
const { Op } = require("sequelize");

const getPerfiles = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const estate = estado=="1"?true:false;
    const perfil = await Perfil.findAll({
        where:{
            estado:estate
        }
    });
    res.json({
      ok: true,
      msg: "Se muestra los datos con exito",
      perfil,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const getPerfilMenu=async(req=request,res=response)=>{
  try {
    //const usuario = req.usuarioToken;
    const {id} = req.params;
    //OBTENEMOS LOS SUBMENU QUE NO DEBERIAN ESTAR
    const perfSubMenu = await PerfilSubMenu.findAll({
      where:{
        idPerfil:id
      },
      attributes:['idSubMenu']
    });
    let listArray = [];
    for (let i = 0; i < perfSubMenu.length; i++) {
      listArray.push(perfSubMenu[i].idSubMenu);
    }
    //let listArray = [1,2];
    const menu = await Menu.findAll({
      attributes:['idMenu','nomMenu'],
      include:{
          model:SubMenu,
          as:'submenu',
          attributes:['idSubMenu','subMenu'],
          where:{
            idSubMenu:{
              [Op.notIn]:listArray
            }
          }
      }
    })
    res.json({
      ok: true,
      msg: "Se muestra los datos con exito",
      menu
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error: ${error}`
    })
  }
}
const getPerfilMenuInclude=async(req=request,res=response)=>{
  try {
    //const usuario = req.usuarioToken;
    const {id} = req.params;
    //OBTENEMOS LOS SUBMENU QUE NO DEBERIAN ESTAR
    const perfSubMenu = await PerfilSubMenu.findAll({
      where:{
        idPerfil:id
      },
      attributes:['idSubMenu']
    });
    let listArray = [];
    for (let i = 0; i < perfSubMenu.length; i++) {
      listArray.push(perfSubMenu[i].idSubMenu);
    }
    //let listArray = [1,2];
    const menu = await Menu.findAll({
      attributes:['idMenu','nomMenu'],
      include:{
          model:SubMenu,
          as:'submenu',
          attributes:['idSubMenu','subMenu'],
          where:{
            idSubMenu:{
              [Op.in]:listArray
            }
          }
      }
    })
    res.json({
      ok: true,
      msg: "Se muestra los datos con exito",
      menu
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error: ${error}`
    })
  }
}

const getPerfil = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const perfil = await Perfil.findOne({
      where: {
        idPerfil: id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra los datos con exito",
      perfil,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const postPerfil = async (req = request, res = response) => {
  try {
    const { nombre, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    const resp = await Perfil.create(data);
    res.json({
      ok: true,
      msg: "Se muestra los datos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const putPerfil = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, ...data } = req.body;
    //validar que no exista otro perfil igual
    const validar = await Perfil.findOne({
      where: {
        nombre,
        idPerfil: { [Op.ne]: id },
      },
    });
    if (validar != null) {
      return res.json({
        ok: true,
        msg: "Se muestra los datos con exito",
      });
    }
    //validamos que exista el perfil actualizar
    const verificar = await Perfil.findOne({
        where:{
            idPerfil:id
        }
    });

    if (verificar==null) {
        return res(400).json({
                ok: false,
                msg: "No existe el perfil que deseas actualizar",
            }); 
    }

    //empezamos con la actualizacion
    data.nombre= nombre.toUpperCase();
    const perfil = await Perfil.update(data,{
        where:{
            idPerfil:id
        }
    });

    res.json({
      ok: true,
      msg: "Se actualizaron los datos con exito",
      perfil
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const deletePerfil = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} =req.query;
    //verificamos que exista el id 
    const verificar = await Perfil.findOne({
        where:{
            idPerfil:id
        }
    });
    if (verificar==null) {
        return res(400).json({
                ok: false,
                msg: "No existe el perfil que deseas actualizar",
            }); 
    }    
    //actualizamos el estado
    const data={
        estado: estado=="1"?true:false
    };
    const perfil = await Perfil.update(data,{
        where:{
            idPerfil:id
        }
    });
    res.json({
      ok: true,
      msg: data.estado?"Se habilito el perfil con exito":"Se deshabilito el perfil con exito",
      perfil
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  getPerfiles,
  getPerfilMenu,
  getPerfilMenuInclude,
  getPerfil,
  postPerfil,
  putPerfil,
  deletePerfil,
};
