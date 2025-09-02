const { Router, request, response } = require("express");
const { Rol } = require("../models");


const router = Router();

router.get('',async(req=request,res=response)=>{
    try {
        const resp = await Rol.findAll({
            where:{
                estado:1
            }
        })
        res.json({
            ok:true,
            msg:'Se muestran los roles con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
});

module.exports = router;