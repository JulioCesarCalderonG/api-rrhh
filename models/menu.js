const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");


class Menu extends Model{}

Menu.init({
    idMenu:{
        type:DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true
    },
    nomMenu:{
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
    tableName:'menu',
    timestamps:true,
    sequelize
});



module.exports=Menu;