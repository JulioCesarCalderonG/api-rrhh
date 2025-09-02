const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Merito = require("./merito");

class Estado extends Model{};


Estado.init({
    descripcion:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'estado',
    timestamps:false
});


Estado.hasMany(Merito,{
    as:'FK_MeritoEstado',
    foreignKey:'id_estado'
});

Merito.belongsTo(Estado,{
    sourceKey:'id',
    foreignKey:'id_estado'
})


module.exports = Estado;