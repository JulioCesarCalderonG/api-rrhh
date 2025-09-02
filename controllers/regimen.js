const { request, response } = require("express");
const { Regimen } = require("../models");


const mostrarRegimen =async(req=request,res=response)=>{
    try {
      const resp = await Regimen.findAll({
        where:{
          estado:1
        }
      });
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
    mostrarRegimen
}