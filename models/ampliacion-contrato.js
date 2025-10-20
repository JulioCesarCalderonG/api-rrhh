const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class AmpliacionContrato extends Model { }

AmpliacionContrato.init({
    idAmpliacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idContrato:{
        type:DataTypes.INTEGER
    },
    fechaInicio: {
        type: DataTypes.DATE
    },
    fechaFin: {
        type: DataTypes.DATE
    }
}, {
    timestamps: true,
    tableName: 'ampliacionContrato',
    sequelize
})



module.exports =AmpliacionContrato;