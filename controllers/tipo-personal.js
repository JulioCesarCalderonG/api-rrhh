const { request, response } = require("express");
const { TipoPersonal } = require("../models");




const mostrarTipoPersonal=async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const resp = await TipoPersonal.findAll({
            where:{
                estado
            }
        })
        res.json({
            ok:true,
            msg:'Se muestrar los tipos de personal con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
};


module.exports = {
    mostrarTipoPersonal
}