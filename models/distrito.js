const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Provincia = require("./provincia");


class Distrito extends Model { }

Distrito.init({
    idDistrito: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idProvincia:{
        type:DataTypes.INTEGER
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
    tableName: 'distrito',
    sequelize
});


/* Foreign Personal -  DISTRITO */

Distrito.hasMany(Provincia,{
    as:'provincia',
    foreignKey:'idProvincia'
});

Provincia.belongsTo(Distrito,{
    as:'distrito',
    foreignKey:'idProvincia'
});


module.exports=Distrito;