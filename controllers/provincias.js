const { request, response } = require("express");
const { Provincia, Departamento } = require("../models");


const getProvincias = async (req = request, res = response) => {
    try {
        const { estado } = req.query;
        const est = estado == "1" ? true : false;
        const provincia = await Provincia.findAll({
            where: {
                estado: est
            },
            include: [
                {
                    model: Departamento,
                    as: 'departamento',
                    attributes: ['idDepartamento', 'nombre']
                }
            ]
        });
        return res.json({
            ok: true,
            msg: 'Se muestran las provincias con exito',
            provincia
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}
const getProvincia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const provincia = await Provincia.findOne({
            where: {
                idProvincia: id
            }
        })
        res.json({
            ok: true,
            msg: 'Se muestra la provincia con exito',
            provincia
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}
const postProvincia = async (req = request, res = response) => {
    try {
        const { nombre, ...data } = req.body;
        data.nombre = nombre.trim().toUpperCase();
        const provincia = await Provincia.create(data);
        res.json({
            ok: true,
            msg: 'Se creo la provincia con exito',
            provincia
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}
const putProvincia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, ...data } = req.body;
        data.nombre = nombre.trim().toUpperCase();
        const provincia = await Provincia.update(data, {
            where: {
                idProvincia: id
            }
        })
        res.json({
            ok: true,
            msg: 'Se actualizo la provincia con exito',
            provincia
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}
const deleteProvincia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { estado } = req.query;
        //verificamos que exista el id 
        const verificar = await Provincia.findOne({
            where: {
                idProvincia: id
            }
        });
        if (verificar == null) {
            return res(400).json({
                ok: false,
                msg: "No existe la provincia que deseas actualizar",
            });
        }
        //actualizamos el estado
        const data = {
            estado: estado == "1" ? true : false
        };
        const provincia = await Provincia.update(data, {
            where: {
                idProvincia: id
            }
        });
        return res.json({
            ok: true,
            msg: data.estado ? "Se habilito la provincia con exito" : "Se deshabilito la provincia con exito",
            provincia
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}

module.exports = {
    getProvincias,
    getProvincia,
    postProvincia,
    putProvincia,
    deleteProvincia
}