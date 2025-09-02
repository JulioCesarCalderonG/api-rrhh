const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Administrador = require("./administrador");



class Rol extends Model{};

Rol.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'rol',
    timestamps:false
});


Rol.hasMany(Administrador,{
    as:'Fk_RolAdministrador',
    foreignKey:'id_rol',
    
});

Administrador.belongsTo(Rol,{
    sourceKey:'id',
    foreignKey:'id_rol'
});


module.exports = Rol;