const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const RegimenLaboral = require("./regimen-laboral");


class Condicion extends Model{};


Condicion.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'condicion',
    timestamps:false
});


Condicion.hasMany(RegimenLaboral,{
    as:'FK_RlaboralCondicion',
    foreignKey:'id_condicion',
    
});

RegimenLaboral.belongsTo(Condicion,{
    sourceKey:'id',
    foreignKey:'id_condicion'
});


module.exports = Condicion