const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Condicion = require("./condicion");


class Regimen extends Model{};


Regimen.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'regimen',
    timestamps:false
});

Regimen.hasMany(Condicion,{
    as:'FK_CondicionRegimen',
    foreignKey:'id_regimen',
    
});
Condicion.belongsTo(Regimen,{
    sourceKey:'id',
    foreignKey:'id_regimen'
})



module.exports = Regimen;