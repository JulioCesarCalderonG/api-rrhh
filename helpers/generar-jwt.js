const { response } = require('express');
const jwt = require('jsonwebtoken');
const generarJWT = (id = '',cargo='') =>{
    return new Promise((resolve, reject)=> {
        const payload = {id,cargo};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}
const generarUsuarioJWT = (id = '',idPerfil='') =>{
    return new Promise((resolve, reject)=> {
        const payload = {idUsuario:id,idPerfil};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}
module.exports = {
    generarJWT,
    generarUsuarioJWT
}