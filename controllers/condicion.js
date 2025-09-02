const { request, response } = require("express");
const { Condicion } = require("../models");


const mostrarCondicion =async(req=request,res=response)=>{
    try {
      const {id} = req.query;
      const resp = await Condicion.findAll({
        where:{
          id_regimen:id,
          estado:1
        }
      })
      res.json({
        ok:true,
        msg:'Se muestran los datos con exito',
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
    mostrarCondicion
}