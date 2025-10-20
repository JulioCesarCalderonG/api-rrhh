const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { Usuario, Perfil } = require("../models");
const { generarUsuarioJWT } = require("../helpers/generar-jwt");

const getUsuarios= async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const est= estado=="1"?true:false;
        const usuario = await Usuario.findAll({
            where:{
                estado:est
            },
            include:{
                model:Perfil,
                as:'perfil',
                attributes:['idPerfil','nombre']
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const getUsuario= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const usuario = await Usuario.findOne({
            where:{
                idUsuario:id
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra el usuario con exito',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const postUsuario= async(req=request,res=response)=>{
    try {
        const {nombre, apellido,password,...data} = req.body;
        data.nombre = nombre.toUpperCase();
        data.apellido=apellido.toUpperCase();
        //validar el password
         // Creamos un password Hasheado
        const salt = bcryptjs.genSaltSync();
        const hasPassword = bcryptjs.hashSync(password, salt);
        data.password=hasPassword;

        const usuario = await Usuario.create(data);


        res.json({
            ok:true,
            msg:'Se registro el usuario con exito',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const postLoginUsuario= async(req=request,res=response)=>{
    try {
        const {user,password,...data}=req.body;
        //obtenemos los datos del usuario
        const usuario = await Usuario.findOne({
            where:{
                user
            }
        });
        //validamos que exista el usuario
        if (usuario==null) {
            return res.status(400).json({
            ok:false,
            msg:'Se no existe el usuario, verifique'
        });
        }
        //validamos que este activo
        if (!usuario.estado) {
            return res.status(400).json({
            ok:false,
            msg:'Se usuario esta deshabilitado,converse con el administrador'})
        }
        //validamos el password
        const validatePassword = bcryptjs.compareSync(password,usuario.password);
        if (!validatePassword) {
            return res.status(400).json({
            ok:false,
            msg:'El password no es correcto'});
        }
        const token = await generarUsuarioJWT(usuario.idUsuario,usuario.idPerfil);
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const putUsuarioPassword= async(req=request,res=response)=>{
    try {
        const {password,...data} = req.body;
        const {id} = req.params;
        //hasheamos el nuevo password
        const salt = bcryptjs.genSaltSync();
        const hasPassword = bcryptjs.hashSync(password, salt);
        data.password=hasPassword;

        //actualizamos
        const usuario = await Usuario.update(data,{
            where:{
                idUsuario:id
            }
        });
        res.json({
            ok:true,
            msg:'Se actualizo el password con exito',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const putUsuario= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const {nombre,apellido,...data} = req.body;
        data.nombre=nombre.toUpperCase();
        data.apellido=apellido.toUpperCase();
        const usuario = await Usuario.update(data,{
            where:{
                idUsuario:id
            }
        });
        res.json({
            ok:true,
            msg:'Se actualizaron los datos con exito',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const deleteUsuario= async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const {id}=req.params;
        const data = {
            estado:estado=="1"?true:false
        }
        const usuario= await Usuario.update(data,{
            where:{
                idUsuario:id
            }
        })
        res.json({
            ok:true,
            msg: data.estado?"Se habilito el usuario con exito":"Se deshabilito el usuario con exito",
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    postLoginUsuario,
    putUsuarioPassword,
    putUsuario,
    deleteUsuario
}