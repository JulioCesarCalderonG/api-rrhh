const { request, response } = require("express");
const { Menu, PerfilSubMenu, SubMenu } = require("../models");
const { Op } = require("sequelize");



const getMenus= async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const est = estado=="1"?true:false;
        const menu = await Menu.findAll({
            where:{
                estado:est
            }
        })
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const getMenu= async(req=request,res=response)=>{
    try {
        const {id} = req.params;
        const menu = await Menu.findOne({
            where:{
                idMenu:id
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}
const getNavigation= async(req=request,res=response)=>{
    try {
        const idPerfil = req.idPerfil;
        const perSubMenu = await PerfilSubMenu.findAll({
            where:{
                idPerfil
            },
            include:[
                {
                    model:SubMenu,
                    as:'submenu',
                    where:{
                        estado:true
                    },
                    include:[
                        {
                            model:Menu,
                            as:'menu'
                        }
                    ]
                }
            ],
            attributes:['idSubMenu']
        });
        //obtener los idMenu
        const listIdMenu = perSubMenu.map(resp=>resp.submenu.idMenu);
        const uniIdMenu = [...new Set(listIdMenu)];

        //obtener los idSubMenu
        const listIdSubMenu = perSubMenu.map(resp=>resp.submenu.idSubMenu);
        const uniIdSubMenu = [...new Set(listIdSubMenu)];
        const menu = await Menu.findAll({
            where:{
                idMenu:{
                    [Op.in]:uniIdMenu
                }
            },
            include:[
                {
                    model:SubMenu,
                    as:'submenu',
                    required: false, // Hace LEFT JOIN
                    on: {
                        idMenu: { [Op.col]: 'Menu.idMenu' },
                        idSubMenu: { [Op.in]: uniIdSubMenu }
                    },
                    attributes:['subMenu','titulo']
                }
            ],
            attributes:['nomMenu','titulo']
        })
        res.json({
            ok:true,
            msg:'Se muestra los datos con exito',
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const postMenu= async(req=request,res=response)=>{
    try {
        const {nomMenu,titulo,...data} = req.body;
        data.nomMenu=nomMenu.trim().toLowerCase();
        data.titulo=titulo.trim().toUpperCase();
        const menu = await Menu.create(data);
        res.json({
            ok:true,
            msg:'Se registro el menu con exito',
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const putMenu= async(req=request,res=response)=>{
    try {
        const {nomMenu,titulo,...data} = req.body;
        const {id} = req.params;
        data.nomMenu=nomMenu.trim().toLowerCase();
        data.titulo=titulo.trim().toUpperCase();
        const menu = await Menu.update(data,{
            where:{
                idMenu:id
            }
        });
        res.json({
            ok:true,
            msg:'Se actualizo los datos con exito',
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

const deleteMenu= async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const {id}=req.params;
        const data = {
            estado:estado=="1"?true:false
        }
        const menu= await Menu.update(data,{
            where:{
                idMenu:id
            }
        })
        res.json({
            ok:true,
            msg: data.estado?"Se habilito el menu con exito":"Se deshabilito el menu con exito",
            menu
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        });
    }
}

module.exports = {
    getMenus,
    getMenu,
    postMenu,
    putMenu,
    deleteMenu,
    getNavigation
}