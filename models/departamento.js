const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Departamento extends Model { }

Departamento.init({
    idDepartamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50)
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    timestamps: true,
    tableName: 'departamento',
    sequelize
})



module.exports =Departamento;