const { request, response, json } = require("express");
const { RegimenLaboral, Personal, Reporte } = require("../models");
const { generarNombreReporte, funDate, generarNombreReporteFirma, enviarWelcome } = require("../helpers");
const fs = require("fs");
const path = require("path");


const mostrarReportes = async(req=request,res=response)=>{
    try {
        const {atendido} = req.query;
        
        const resp = await Reporte.findAll({
            where:{
                atendido
            },
            include:[
                {
                    model:Personal
                }
            ]
        })
        res.json({
            ok:true,
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const mostrarReporteImagen = async(req=request,res=response)=>{
    try {
            const {nombre} = req.params;
            const pathImagen = path.join(
              __dirname,
              "../uploads",
              "reportes",
              nombre
            );
            return res.sendFile(pathImagen);
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const mostrarReporteID = async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const guardarReporte = async(req=request,res=response)=>{
    try {
        const {dni,tipo_reporte,...data} = req.body;
        const {fecha, hora} = funDate();
        const resp = await Personal.findOne({
            where:{
                dni
            }
        });

        if (!resp) {
            return res.status(400).json({
                ok:false,
                msg:'DNI aun no registrado'
            })
        }

        const reporteResp = await Reporte.findOne({
            where:{
                id_personal:resp.id,
                id_tipo_reporte:tipo_reporte,
                fecha_solicitud:fecha
            }
        });
        if (reporteResp) {
            return res.status(400).json({
                ok:false,
                msg:'Usted ya solicito su reporte el dia de hoy'
            })
        }
        let nombre = '';
        let regimen={};
        switch (tipo_reporte) {
            case '1':
                    nombre = await generarNombreReporte(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fecha,hora,undefined);
                break;
            case '2':
                    regimen = await RegimenLaboral.findOne({
                        where:{
                            id_personal:resp.id
                        },
                        order:[
                            ['id','DESC'],
                            ['fin','DESC']
                        ]
                    });
                    if (!regimen) {
                        return res.status(400).json({
                            ok:false,
                            msg:`Usted no tiene un regimen asignado`
                        })
                    }
                    nombre = await generarNombreReporte(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fecha,hora,`${regimen.id}`);
                break;
            case '3':
                    nombre = await generarNombreReporte(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fecha,hora,undefined);
                break;
            case '4':
                    nombre = await generarNombreReporte(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fecha,hora,undefined);
                break;
            default:
                break;
        }
        data.fecha_solicitud = fecha;
        data.hora_solicitud= hora;
        data.id_personal = resp.id;
        data.id_tipo_reporte = tipo_reporte;
        data.reporte = nombre;

        const reporte = await Reporte.create(data);
        res.json({
            ok:true,
            msg:'Se envio su solicitud, le estara llegando un correo en los proximos dias',
            resp:reporte
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const actualizarReporteFirma = async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const {id_personal, tipo_reporte, fechareporte,...data} = req.body;

        /* Eliminar Documento Anterior */

        const reporteResp = await Reporte.findOne({
            where:{
                id
            }
        });
        if (reporteResp.reporte) {
            const pathImagen = path.join(__dirname,"../uploads","reportes",reporteResp.reporte);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }    
        }
        /* Agregar nuevo documento */
        const resp = await Personal.findOne({
            where:{
                id:id_personal
            }
        });

        if (!resp) {
            return res.status(400).json({
                ok:false,
                msg:'DNI aun no registrado'
            })
        }
        
        let nombre = '';
        let regimen={};
        const {fecha, hora} = funDate();
        switch (tipo_reporte) {
            case '1':
                    nombre = await generarNombreReporteFirma(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fechareporte,hora,undefined);
                break;
            case '2':
                    regimen = await RegimenLaboral.findOne({
                        where:{
                            id_personal:resp.id
                        },
                        order:[
                            ['id','DESC'],
                            ['fin','DESC']
                        ]
                    });
                    if (!regimen) {
                        return res.status(400).json({
                            ok:false,
                            msg:`Usted no tiene un regimen asignado`
                        })
                    }
                    nombre = await generarNombreReporteFirma(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fechareporte,hora,`${regimen.id}`);
                break;
            case '3':
                    nombre = await generarNombreReporteFirma(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fechareporte,hora,undefined);
                break;
            case '4':
                    nombre = await generarNombreReporteFirma(resp.id,tipo_reporte,`${resp.nombre}-${resp.apellido}`,fechareporte,hora,undefined);
                break;
            default:
                break;
        }
        data.reporte = nombre;
        data.firmado = 1;
        const reporte = await Reporte.update(data,{
            where:{
                id
            }
        });
        res.json({
            ok:true,
            msg:'Documento firmado con exito',
            resp:reporte
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const actualizarReporte = async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const {nombre, correo} = req.body;
        const {fecha, hora} = funDate();
        const report = await Reporte.findOne({
            where:{
                id
            }
        });
        if (!report) {
            return res.status(400).json({
                ok:false,
                msg:'No existe el reporte'
            });
        }
        if (report.firmado===0) {
            return res.status(400).json({
                ok:false,
                msg:'El documento no ha sido firmado, requiere firma'
            });
        }

        const reporte = await Reporte.update({
            atendido:1,
            fecha_emision:fecha,
            hora_emision:hora
        },{
            where:{
                id
            }
        })
        //const resp = await enviarReporte(nombre,correo);
        res.json({
            ok:true,
            resp:reporte,
            email:null
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const eliminarReporte = async(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

module.exports = {
    mostrarReportes,
    mostrarReporteImagen,
    mostrarReporteID,
    guardarReporte,
    actualizarReporte,
    actualizarReporteFirma,
    eliminarReporte
}