const { response, request } = require("express")
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");

const getUsuarios = async(req= request, res = response)=>{
    const {unblock} = req.query;
    const usuario = await Usuario.find({estado:unblock})
    res.json({
        ok:true,
        msg:'Usuarios mostrado con exito',
        usuario,
    })
}

const getUsuario = async(req= request, res = response)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.json({
        ok:true,
        msg:'Usuario mostrado con exito',
        usuario
    })
}

const postUsuario = async(req= request, res = response)=>{
    const {name, lastname,password, ...data} = req.body;
    data.name = name.toUpperCase();
    data.lastname = lastname.toUpperCase();
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    
    const usuario = new Usuario(data);
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        ok:true,
        msg:'Usuario creado con exito',
        usuario
    })
}

const putUsuario = async(req= request, res = response)=>{
    const {id} = req.params;
    const {password, ...data} = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    if (data.lastname) {
        data.lastname = data.lastname.toUpperCase();
    }
    if(password){
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok:true,
        msg:'Usuario editado con exito',
        usuario
    })
}
const unBlockUsuario =async(req= request, res = response)=>{
    const {id} = req.params;
    const {unblock} = req.query;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: unblock}, {new:true})
    res.json({
        ok:true,
        msg:usuario.estado ? 'Usuario desbloqueado correctamente' : 'Usuario bloqueado correctamente',
        usuario
    })
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    unBlockUsuario
}