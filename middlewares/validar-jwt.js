const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const { Usuario, Perfil, Administrador } = require('../models');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const admin = await Administrador.findOne({
            where:{
                id
            }
        });
        if (!admin) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!admin.activo) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.adminToken = admin;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    } 
}
const validarJWTUsuario =async (req= request, res = response, next)=>{ 
    const authHeader = req.headers['authorization'];

    // Validar que exista y tenga formato Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'No hay token o el formato es incorrecto'
        });
    }
    // Quitar el 'Bearer ' y quedarnos solo con el token
    const token = authHeader.split(' ')[1];

    try {
        const {idUsuario,idPerfil} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario

        const usuario = await Usuario.findOne({
            where:{
                idUsuario
            }
        });
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.usuarioToken = usuario;
        req.idPerfil=idPerfil;
        next();
    } catch (error) {
        res.status(401).json({
            msg: `Error: ${error}`
        })
    } 
}
const validarJWTAdmin =async (req= request, res = response, next)=>{ 
    const authHeader = req.headers['authorization'];

    // Validar que exista y tenga formato Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'No hay token o el formato es incorrecto'
        });
    }
    // Quitar el 'Bearer ' y quedarnos solo con el token
    const token = authHeader.split(' ')[1];

    try {
        const {idUsuario,idPerfil} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario

        const usuario = await Usuario.findOne({
            where:{
                idUsuario
            }
        });
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        //validar que el perfil sea de administrador
        const perfil= await Perfil.findOne({
            where:{
                idPerfil:idPerfil
            }
        });
        if (!perfil) {
            return res.status(401).json({
                msg: 'El usuario no tiene perfil asociado'
            })
        }
        // Verificar si el uid tiene estado en tru
        if (perfil.nombre.toLowerCase()!="administrador") {
            return res.status(401).json({
                msg: 'Tu perfil no te permite hacer estos tipos de cambios'
            })
        }
        req.usuarioToken = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: `Error: ${error}`
        })
    } 
}
module.exports = {
    validarJWTAdmin,
    validarJWTUsuario,
    validarJWT
}