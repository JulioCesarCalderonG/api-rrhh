const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const generarToken = require('../helpers/generar-jwt');
const { Administrador, Rol } = require('../models');

const postLogin = async (req = request, res = response) => {
 
  const {usuario,password} = req.body;
  const user = await Administrador.findOne({
    where:{
      usuario
    },
    include:[
      {
        model:Rol
      }
    ]
  });
  if (!user) {
    return res.json({
      ok: false,
      msg: 'Usuario no existe, converse con el administrador',
      user: null,
      token: null,
    });
  }
  if (!user.activo) {
    return res.json({
      ok: false,
      msg: 'Usuario bloqueado, converse con el administrador',
      user: null,
      token: null,
    });
  }
  if (password!==user.password) {
    return res.json({
      ok: false,
      msg: 'Contraseña no valida',
      user: null,
      token: null,
    });
  }
  token = await generarToken.generarJWT(user.id,user.Rol.sigla);
  res.json({
    ok: true,
    msg: 'Login correcto',
    user,
    token,
  });
}

const resetPassword=async (req = request, res = response) =>{
  try {
    const {passworduno,passworddos}= req.body;
    const admin = req.adminToken;

    if (passworduno!==admin.password) {
      return res.json({
        ok:false,
        msg:'Password anterior incorrecto'
      })
    }
    const resp = await Administrador.update({password:passworddos},{
      where:{
        id:admin.id
      }
    })

    res.json({
      ok:true,
      msg:'Se actualizo el password con exito',
      resp
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error: ${error}`
    })
  }
}

module.exports = {
  postLogin,
  resetPassword
};
