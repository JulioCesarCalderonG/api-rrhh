const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Merito = require("./merito");

class Sancion extends Model{};


Sancion.init({
    titulo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'sancion',
    timestamps:false
});

Sancion.hasMany(Merito,{
    as:'FK_MeritoSancion',
    foreignKey:'id_sancion'
    
});

Merito.belongsTo(Sancion,{
    sourceKey:'id',
    foreignKey:'id_sancion'
})

module.exports = Sancion;