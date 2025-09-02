const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Reporte extends Model{};

Reporte.init({
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_tipo_reporte:{
        type:DataTypes.INTEGER
    },
    fecha_solicitud:{
        type:DataTypes.CHAR
    },
    hora_solicitud:{
        type:DataTypes.CHAR
    },
    fecha_emision:{
        type:DataTypes.CHAR
    },
    hora_emision:{
        type:DataTypes.CHAR
    },
    reporte:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    atendido:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    firmado:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'reporte',
    timestamps:false
});


module.exports = Reporte;