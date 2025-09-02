const { response, request } = require("express");
const { Tipodocumento } = require("../models");

const validarArchivoSubir = (req,res=response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send({msg:'No hay archivos que subir'});
      }
    next();
}

const validarArchivoSubirDos = async(req=request,res=response, next) => {
    const {tipo_documento,...data}=req.body;
    const resp= await Tipodocumento.findOne({
        where:{
            id:tipo_documento
        }
    });
    if (resp.descripcion==='BASE DE DATOS' || resp.descripcion==='SIGA') {
        next();
    }else {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).json({msg:'Selecciona el documento que autoriza'});
        }
        next();
    }
}



module.exports={
    validarArchivoSubir,
    validarArchivoSubirDos
}