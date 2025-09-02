const { request, response } = require("express");
const { PerfilSubMenu, Perfil, SubMenu } = require("../models");



const getPerfilSubMenus= async(req=request,res=response)=>{
    try {
        const perfilSubMenu = await PerfilSubMenu.findAll({
            include:[
                {
                    model:Perfil,
                    as:'perfil'
                },
                {
                    model:SubMenu,
                    as:'submenu'
                }
            ]
        });

        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const getPerfilSubMenu= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const perfilSubMenu = await PerfilSubMenu.findOne({
            where:{
                idPerSubMenu:id
            }
        });
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const postPerfilSubMenu= async(req=request,res=response)=>{
    try {
        const data = req.body;
        const perfilSubMenu = await PerfilSubMenu.create(data);
        res.json({
            ok:true,
            msg:'Se registraron los datos con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const putPerfilSubMenu= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const perfilsubmenu= await PerfilSubMenu.update(data,{
            where:{
                idPerSubMenu:id
            }
        })
        res.json({
            ok:true,
            msg:'Se actualizo los datos con exito',
            perfilsubmenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const deletePerfilSubMenu= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const perfilSubMenu = await PerfilSubMenu.destroy({
            where:{
                idPerSubMenu:id
            }
        })
        res.json({
            ok:true,
            msg:'Se elimino el registro con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

module.exports = {
    getPerfilSubMenus,
    getPerfilSubMenu,
    postPerfilSubMenu,
    putPerfilSubMenu,
    deletePerfilSubMenu
}