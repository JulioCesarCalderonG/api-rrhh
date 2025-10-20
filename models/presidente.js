const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Presidente extends Model { }

Presidente.init({
    idPresidente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING(150)
    },
    dni: {
        type: DataTypes.CHAR(8)
    },
    resDesignado: {
        type: DataTypes.STRING(100)
    },
    resAdminUno: {
        type: DataTypes.STRING(100)
    },
    resAdminDos: {
        type: DataTypes.STRING(100)
    },
    docDesignado: {
        type: DataTypes.STRING(50)
    },
    docAdminUno: {
        type: DataTypes.STRING(50)
    },
    docAdminDos: {
        type: DataTypes.STRING(50)
    },
    fechaDesignado: {
        type: DataTypes.DATE
    },
    fechaAdminUno: {
        type: DataTypes.DATE
    },
    fechaAdminDos: {
        type: DataTypes.DATE
    },
    grado:{
        type:DataTypes.CHAR(5)
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    timestamps: true,
    tableName: 'presidente',
    sequelize
});



module.exports = Presidente;