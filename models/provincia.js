const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Departamento = require("./departamento");


class Provincia extends Model { }

Provincia.init({
    idProvincia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idDepartamento:{
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
    tableName: 'provincia',
    sequelize
});


/* Foreign PROVINCIA -  DEPARTAMENTO */

Provincia.hasMany(Departamento,{
    as:'departamento',
    foreignKey:'idDepartamento'
});

Departamento.belongsTo(Provincia,{
    as:'provincia',
    foreignKey:'idDepartamento'
});


module.exports=Provincia;
