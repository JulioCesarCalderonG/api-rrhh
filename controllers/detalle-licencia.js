const { request, response } = require("express");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");

const mostrarDetalleLicencia = async (req=request, res=response)=>{
    try {
        const {estado} = req.query;
        const resp = await DetalleLicencia.findAll({
            where:{
            estado,
            },
            include:[
                {
                    model:TipoLicencia
                },
            ],
            order:[
                ['id_tipo_licencia','ASC'],
                ['nombre','ASC']
            ]
        });
        let array=[];
        if (resp) {
            for (let i = 0; i < resp.length; i++) {
                const obj={
                    ids:i+1,
                    id:resp[i].id,
                    nombre:resp[i].nombre,
                    estado:resp[i].estado,
                    id_tipo_licencia:resp[i],
                    TipoLicencium:resp[i].TipoLicencium
                }
                array.push(obj);
            }
        }
        res.json({
            ok:true,
            msg:"Se muestran los datos correctamente",
            resp:array,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: `Error: ${error}`,
        })
    }
}

const mostrarIdDetalleLicencia = async(req=request, res=response)=>{
    try {
        const {id} = req.params;
        const resp = await DetalleLicencia.findOne({
            where:{
                id,
            }
        });
        res.json({
            ok:true,
            msg:"Se muestra el detalle licencia con extio",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`,
        });
    }
}

const mostrarDetalleLicenciaTipo =async(req=request,res=response)=>{
    try {
        const {id} =req.params;
        const resp = await DetalleLicencia.findAll({
            where:{
                id_tipo_licencia:id,
                estado:1
            }
        })
        res.json({
            ok:true,
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}

const agregarDetalleLicencia = async (req=request, res=response)=>{
    try {
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await DetalleLicencia.create(data);
        res.json({
            ok:true,
            msg: "Datos ingresados correctamente",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`,
        });
    }
}

const editarDetalleLicencia = async(req=request, res=response)=>{
try {
    const {id} = req.params;
    const {nombre, ...data} = req.body;
    data.nombre = nombre.toUpperCase();
    const resp = await DetalleLicencia.update(data, {
        where:{
            id,
        }
    });
    res.json({
        ok:true,
        msg: "Se actualizo con exito",
        resp,
    })
} catch (error) {
    res.status(400).json({
        ok: false,
        msg:`Error: ${error}`,
    })
}
}

const eliminarDetalleLicencia = async(req=request, res=response)=>{
try {
    const {id}= req.params;
    const {estado} = req.query;
    const data = {
        estado,
    };
    const resp = await DetalleLicencia.update(data, {
        where:{
            id,
        },
    });
    res.json({
        ok:true,
        msg: (estado === '1')?'Se habilito el detalle licencia con extio':'Se deshabilito el detalle licencia con exito',
        resp,
    });
} catch (error) {
    res.status(400).json({
        ok:false,
        msg:`Error: ${error}`,
    });
}
};

module.exports = {
    mostrarDetalleLicenciaTipo,
    mostrarIdDetalleLicencia,
    mostrarDetalleLicencia,
    agregarDetalleLicencia,
    editarDetalleLicencia,
    eliminarDetalleLicencia

}