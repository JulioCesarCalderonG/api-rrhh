const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Menu = require("./menu");


class SubMenu extends Model{}

SubMenu.init({
    idSubMenu:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idMenu:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Menu,
            key:'idMenu'
        }
    },
    subMenu:{
        type:DataTypes.STRING,
        allowNull:false
    },
    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    sequelize,
    tableName:"subMenu",
    timestamps:true
});

// Definir relación
SubMenu.belongsTo(Menu, { foreignKey: 'idMenu', as: 'menu' });
Menu.hasMany(SubMenu, { foreignKey: 'idMenu', as: 'submenu' });

module.exports= SubMenu;