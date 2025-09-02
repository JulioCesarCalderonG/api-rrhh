const { request, response } = require("express");
const { Administrador, Historial } = require("../models");


const mostrarHistorial = async(req = request, res = response) =>{
    try {
        const {id} =req.query;
        if (id) {
            const resp = await Historial.findAll({
                where:{
                    id_tipo_record:id
                },
                include:[
                    {
                        model:Administrador
                    }
                ]
            });
            return res.json({
                ok:true,
                msg: 'Se muestran los datos con exito',
                resp,
            });
        }
        const resp = await Historial.findAll({
            include:[
                {
                    model:Administrador
                }
            ]
        });
        res.json({
            ok:true,
            msg: 'Se muestran los datos con exito',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
};


const mostrarIdHistorial = async(req = request, res = response) =>{
    try {
        const { id } = req.params;
        const resp = await Historial.findOne({
            where:{
                id,
            }
        });
        res.json({
            ok:true,
            msg: 'Se muestran los datos correctamente',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
};

module.exports = {
    mostrarHistorial,
    mostrarIdHistorial,
};

