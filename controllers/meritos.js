const { request, response } = require("express");
const { obtenerDependencia } = require("../helpers/obtener-depedencia");
const { subirArchivo, funDate } = require("../helpers");
const { Merito, Sancion, Estado, Personal, Historial } = require("../models");




const mostrarMeritoPersonal =async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const resp = await Merito.findAll({
            where:{
                id_personal:id
            },
            include:[
                {
                    model:Sancion
                },
                {
                    model:Estado
                },
                {
                    model:Personal
                }
            ],
            order:[
                ['fecha','ASC']
            ]
        })
        let array = [];
        if (resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              const data = {
                ids: i + 1,
                id: resp[i].id,
                codigo_documento: resp[i].codigo_documento,
                instancia: resp[i].instancia,
                sancion: resp[i].Sancion.titulo,
                fecha: resp[i].fecha,
                estado: resp[i].Estado.descripcion,
                observacion: resp[i].observacion,
                documento: resp[i].documento,
              };
              array.push(data);
            }
          }
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            resp:array
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const mostrarMeritoPersonalDni =async(req=request,res=response)=>{
    try {
        const {dni}= req.params;
        const personal = await Personal.findOne({
            where:{
                dni
            }
        });
        if (!personal) {
            return res.json({
                ok:false,
                msg:`no se encontro personal con el dni`
            })
        }
        const resp = await Merito.findAll({
            where:{
                id_personal:personal.id
            },
            include:[
                {
                    model:Sancion
                },
                {
                    model:Estado
                },
                {
                    model:Personal
                }
            ],
            order:[
                ['fecha','ASC']
            ]
        })
        let array = [];
        if (resp.length > 0) {
            for (let i = 0; i < resp.length; i++) {
              const data = {
                ids: i + 1,
                id: resp[i].id,
                codigo_documento: resp[i].codigo_documento,
                instancia: resp[i].instancia,
                sancion: resp[i].Sancion.titulo,
                fecha: resp[i].fecha,
                estado: resp[i].Estado.descripcion,
                observacion: resp[i].observacion,
                documento: resp[i].documento,
              };
              array.push(data);
            }
          }
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            resp:array
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const mostrarMeritoId =async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const resp = await Merito.findOne({
            where:{
                id
            },
            include:[
                {
                    model:Sancion
                },
                {
                    model:Estado
                },
                {
                    model:Personal
                }
            ]
        });
        const array = resp.codigo_documento.split(' ');
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            resp,
            cod_documento:array[1]
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const guardarMerito =async(req=request,res=response)=>{
    try {
        const {tipo_documento, cod_documento, tipo_instancia,id_instancia,personal,...data} = req.body;
        const files = req.files;
        const admin = req.adminToken;
        const {fecha,hora} = funDate();
        const instancia = await obtenerDependencia(tipo_instancia,id_instancia);
        let codigo_documento='';
        switch (tipo_documento) {
            case '1':
                 codigo_documento = `MEMORANDUM ${cod_documento.toUpperCase()}`
                break;
            case '2':
                 codigo_documento = `OFICIO ${cod_documento.toUpperCase()}`
                break;
            case '3':
                 codigo_documento = `RESOLUCION ${cod_documento.toUpperCase()}`
                break;
            default:
                break;
        }
        
        const documento = await subirArchivo(files,['pdf'],'meritos');

        data.codigo_documento=codigo_documento;
        data.tipo_documento=tipo_documento;
        data.tipo_instancia=tipo_instancia;
        data.id_instancia=id_instancia;
        data.instancia=instancia;
        data.documento = documento;

        const resp = await Merito.create(data);
        const dataHisto = {
            fecha,
            hora,
            descripcion:`SE AGREGO EL RECORD DEMERITO DEL PERSONAL: ${personal}`,
            id_tipo_record:4,
            id_record:resp.id,
            id_administrador:admin.id
       }
          const historial= await Historial.create(dataHisto);
        res.json({
            ok:true,
            msg:'Se creo el documento con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const actualizarMerito =async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const admin = req.adminToken;
        const {fecha,hora} = funDate();
        const {tipo_documento, cod_documento, tipo_instancia,id_instancia,personal,...data} = req.body;
        const instancia = await obtenerDependencia(tipo_instancia,id_instancia);
        let codigo_documento='';
        switch (tipo_documento) {
            case '1':
                 codigo_documento = `MEMORANDUM ${cod_documento.toUpperCase()}`
                break;
            case '2':
                 codigo_documento = `OFICIO ${cod_documento.toUpperCase()}`
                break;
            case '3':
                 codigo_documento = `RESOLUCION ${cod_documento.toUpperCase()}`
                break;
            default:
                break;
        }
        data.codigo_documento=codigo_documento;
        data.tipo_documento=tipo_documento;
        data.tipo_instancia=tipo_instancia;
        data.id_instancia=id_instancia;
        data.instancia=instancia;
        const resp = await Merito.update(data,{
            where:{
                id
            }
        });
        const dataHisto = {
            fecha,
            hora,
            descripcion:`SE MODIFICO EL RECORD DEMERITO DEL PERSONAL: ${personal}`,
            id_tipo_record:4,
            id_record:id,
            id_administrador:admin.id
       }
          const historial= await Historial.create(dataHisto);
        res.json({
            ok:true,
            msg:'Se creo el documento con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const eliminarMerito =async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const admin = req.adminToken;
        const {fecha,hora} = funDate();
        const {personal}= req.query;
        const resp = await Merito.destroy({
            where:{
                id
            }
        });
        const dataHisto = {
            fecha,
            hora,
            descripcion:`SE MODIFICO EL DOCUMENTO QUE AUTORIZA EL RECORD LABORAL DEL PERSONAL: ${personal}`,
            id_tipo_record:4,
            id_record:id,
            id_administrador:admin.id
          }
          const historial= await Historial.create(dataHisto);
        res.json({
            ok:true,
            msg:'Se elimino el merito con exito',
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
    mostrarMeritoPersonal,
    mostrarMeritoPersonalDni,
    guardarMerito,
    mostrarMeritoId,
    actualizarMerito,
    eliminarMerito
}