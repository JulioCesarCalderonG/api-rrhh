const { request, response } = require("express");
const { SubMenu } = require("../models");



const getSubMenus= async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const est=estado=="1"?true:false;
        const subMenu = await SubMenu.findAll({
            where:{
                estado:est
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            subMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const getSubMenu= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const subMenu = await SubMenu.findOne({
            where:{
                idSubMenu:id
            }
        });

        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            subMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const postSubMenu= async(req=request,res=response)=>{
    try {
        const {subMenu,titulo,...data}= req.body;
        data.subMenu=subMenu.trim().toLowerCase();
        data.titulo=titulo.trim().toUpperCase();
        const subMen= await SubMenu.create(data);
        res.json({
            ok:true,
            msg:'Se registraron los datos con exito',
            subMenu:subMen
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const putSubMenu= async(req=request,res=response)=>{
    try {
        const {subMenu,titulo,...data}= req.body;
        const {id} = req.params;
        data.subMenu=subMenu.trim().toLowerCase();
        data.titulo=titulo.trim().toUpperCase();
        const resp = await SubMenu.update(data,{
            where:{
                idSubMenu:id
            }
        })
        res.json({
            ok:true,
            msg:'Se actualizo los datos con exito',
            subMenu:resp
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const deleteSubMenu= async(req=request,res=response)=>{
    try {

       const {estado} = req.query;
        const {id}=req.params;
        const data = {
            estado:estado=="1"?true:false
        }
        const subMenu= await SubMenu.update(data,{
            where:{
                idSubMenu:id
            }
        })
        res.json({
            ok:true,
            msg: data.estado?"Se habilito el submenu con exito":"Se deshabilito el submenu con exito",
            subMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

module.exports = {
    getSubMenus,
    getSubMenu,
    postSubMenu,
    putSubMenu,
    deleteSubMenu
}