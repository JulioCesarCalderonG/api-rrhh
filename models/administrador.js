const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Historial = require("./historial");


class Administrador extends Model{}

Administrador.init({
    usuario:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_rol:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    timestamps:false,
    tableName:'administrador'
});

Administrador.hasMany(Historial,{
    as:'FK_HistorialAdministrador',
    foreignKey:'id_administrador'
});

Historial.belongsTo(Administrador,{
    sourcekey:'id',
    foreignKey:'id_administrador'
});



module.exports = Administrador;

