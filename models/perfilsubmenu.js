const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Perfil = require("./perfil");
const SubMenu = require("./submenu");


class PerfilSubMenu extends Model{}

PerfilSubMenu.init({
    idPerSubMenu:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idPerfil:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Perfil,
            key:'idPerfil'
        }
    },
    idSubMenu:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SubMenu,
            key:'idSubMenu'
        }
    }
},{
    sequelize,
    tableName:'perfilsubmenu',
    timestamps:true,
     indexes: [
        {
            unique: true,
            fields: ['idPerfil', 'idSubMenu']
        }
    ]

});



// Definir asociaciones
Perfil.belongsToMany(SubMenu, {
    through: PerfilSubMenu,
    foreignKey: 'idPerfil',
    otherKey: 'idSubMenu'
});

SubMenu.belongsToMany(Perfil, {
    through: PerfilSubMenu,
    foreignKey: 'idSubMenu',
    otherKey: 'idPerfil'
});

PerfilSubMenu.belongsTo(Perfil, {
    foreignKey: 'idPerfil',
    as: 'perfil'
});

PerfilSubMenu.belongsTo(SubMenu, {
    foreignKey: 'idSubMenu',
    as: 'submenu'
});

module.exports=PerfilSubMenu;