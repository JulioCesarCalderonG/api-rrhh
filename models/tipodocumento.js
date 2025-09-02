const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Tipodocumento extends Model{}

Tipodocumento.init({
    descripcion:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tipo_documento'
})

module.exports = Tipodocumento