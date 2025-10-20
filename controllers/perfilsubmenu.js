const { request, response } = require("express");
const { PerfilSubMenu, Perfil, SubMenu } = require("../models");
const { Op } = require("sequelize");



const getPerfilSubMenus = async (req = request, res = response) => {
    try {
        const perfilSubMenu = await PerfilSubMenu.findAll({
            include: [
                {
                    model: Perfil,
                    as: 'perfil'
                },
                {
                    model: SubMenu,
                    as: 'submenu'
                }
            ]
        });

        res.json({
            ok: true,
            msg: 'Se muestra los datos con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}

const getPerfilSubMenu = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const perfilSubMenu = await PerfilSubMenu.findOne({
            where: {
                idPerSubMenu: id
            }
        });
        res.json({
            ok: true,
            msg: 'Se muestra los datos con exito',
            perfilSubMenu
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}

const postPerfilSubMenu = async (req = request, res = response) => {
    try {
        const { idPerfil, idSubMenu, ...data } = req.body;
        if (!idPerfil || !Array.isArray(idSubMenu) || idSubMenu.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos. Debes enviar idPerfil y un arreglo de idSubMenu.'
            });
        }
        const registros = idSubMenu.map(submenuId => ({
            idPerfil,
            idSubMenu: submenuId
        }));
        await PerfilSubMenu.bulkCreate(registros);
        res.json({
            ok: true,
            msg: 'Se registraron los datos con exito',
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}

const putPerfilSubMenu = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const perfilsubmenu = await PerfilSubMenu.update(data, {
            where: {
                idPerSubMenu: id
            }
        })
        res.json({
            ok: true,
            msg: 'Se actualizo los datos con exito',
            perfilsubmenu
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
        });
    }
}

const deletePerfilSubMenu = async (req = request, res = response) => {
    try {
        const { idPerfil, idSubMenu, ...data } = req.body;
        if (!idPerfil || !Array.isArray(idSubMenu) || idSubMenu.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos inválidos. Debes enviar idPerfil y un arreglo de idSubMenu.'
            });
        }
        // 🔹 Eliminación en lote (más rápida que hacer un for con await)
        await PerfilSubMenu.destroy({
            where: {
                idPerfil,
                idSubMenu: { [Op.in]: idSubMenu }  // Sequelize interpretará como IN ([...])
            }
        });
        res.json({
            ok: true,
            msg: 'Se quitaron los datos con exito',
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`
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