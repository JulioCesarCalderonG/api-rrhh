const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Area extends Model{}

Area.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    },
    id_unidad_organica:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'area'
});
module.exports = Area;