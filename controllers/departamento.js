const { request, response } = require("express");
const { Departamento, Administrador } = require("../models");



const getDepartamentos = async (req = request, res = response) => {
    try {
        const { estado } = req.query;
        const est = estado == "1" ? true : false;
        const departamento = await Departamento.findAll({
            where: {
                estado: est
            }
        })
        return res.json({
            ok: true,
            msg: 'Se muestran los departamentos con exito',
            departamento
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}

const getDepartamento = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const departamento = await Departamento.findOne({
            where: {
                idDepartamento: id
            }
        })
        return res.json({
            ok: true,
            msg: 'Se muestran el departamentos con exito',
            departamento
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}
const postDepartamento = async (req = request, res = response) => {
    try {
        const { nombre, ...data } = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Departamento.create(data);
        return res.json({
            ok: true,
            msg: 'Se creo el departamento con exito'
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}
const putDepartamento = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, ...data } = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await Departamento.update(data, {
            where: {
                idDepartamento: id
            }
        })
        return res.json({
            ok: true,
            msg: 'Se actualizo el departamento con exito'
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}

const deleteDepartamento = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { estado } = req.query;
        //verificamos que exista el id 
        const verificar = await Departamento.findOne({
            where: {
                idDepartamento: id
            }
        });
        if (verificar == null) {
            return res(400).json({
                ok: false,
                msg: "No existe el departamento que deseas actualizar",
            });
        }
        //actualizamos el estado
        const data = {
            estado: estado == "1" ? true : false
        };
        const departamento = await Departamento.update(data, {
            where: {
                idDepartamento: id
            }
        });
        return res.json({
            ok: true,
             msg: data.estado?"Se habilito el departamento con exito":"Se deshabilito el departamento con exito",
             departamento
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        })
    }
}


module.exports = {
    getDepartamentos,
    getDepartamento,
    postDepartamento,
    putDepartamento,
    deleteDepartamento
}