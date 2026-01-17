const { request, response } = require("express");
const { Distrito } = require("../models");

const getDistritos = async(req=request,res=response)=>{
    try {
        const { estado } = req.query;
        const est = estado == "1" ? true : false;
        const distrito = await Distrito.findAll({
            where: {
                estado: est
            }
        })
        return res.json({
            ok: true,
            msg: 'Se muestran los distritos con exito',
            distrito
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}
const getDistrito = async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const distrito = await Distrito.findOne({
            where:{
                idDistrito:id
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra el distrito con exito',
            distrito
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}
const postDistrito = async(req=request,res=response)=>{
    try {
        const {nombre,...data} = req.body;
        data.nombre= nombre.trim().toUpperCase();
        const distrito = await Distrito.create(data);
        res.json({
            ok:true,
            msg:'Se registro el distrito con exito',
            distrito
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}
const putDistrito = async(req=request,res=response)=>{
    try {
        const {nombre,...data} = req.body;
        data.nombre = nombre.trim().toUpperCase();
        const distrito = await Distrito.update(data,{
            where:{
                idDistrito:id
            }
        })
        res.json({
            ok:true,
            msg:'Se actualizo el distrito con exito',
            distrito
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}
const deleteDistrito = async(req=request,res=response)=>{
    try {
        const { id } = req.params;
        const { estado } = req.query;
        //verificamos que exista el id 
        const verificar = await Distrito.findOne({
            where: {
                idDepartamento: id
            }
        });
        if (verificar == null) {
            return res(400).json({
                ok: false,
                msg: "No existe el distrito que deseas actualizar",
            });
        }
        //actualizamos el estado
        const data = {
            estado: estado == "1" ? true : false
        };
        const distrito = await Distrito.update(data, {
            where: {
                idDistrito: id
            }
        });
        return res.json({
            ok: true,
             msg: data.estado?"Se habilito el distrito con exito":"Se deshabilito el distrito con exito",
             distrito
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}


module.exports ={
    getDistritos,
    getDistrito,
    postDistrito,
    putDistrito,
    deleteDistrito
}