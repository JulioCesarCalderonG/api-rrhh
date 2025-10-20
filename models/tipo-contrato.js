const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class TipoContrato extends Model { }

TipoContrato.init({
    idTipoContrato: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING(100)
    },
    formatContrato: {
        type: DataTypes.STRING(50)
    },
    formatAdenda: {
        type: DataTypes.STRING(50)
    }
}, {
    timestamps: true,
    tableName: 'tipoContrato',
    sequelize
})



module.exports =TipoContrato;