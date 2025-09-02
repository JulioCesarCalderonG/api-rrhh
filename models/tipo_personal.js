const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Cargo = require("./cargo");
const RegimenLaboral = require("./regimen-laboral");

class TipoPersonal extends Model{};


TipoPersonal.init({
    titulo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tipo_personal'
});

/* Relacion tipo personal cargo */
TipoPersonal.hasMany(Cargo,{
    as:'FK_CargoTipoPersonal',
    foreignKey:'id_tipo_personal'    
});

Cargo.belongsTo(TipoPersonal,{
    sourceKey:'id',
    foreignKey:'id_tipo_personal'
});

/* Relacion tipo personal regimen laboral */

TipoPersonal.hasMany(RegimenLaboral,{
    as:'FK_RlaboralTipoPersonal',
    foreignKey:'id_tipo_personal',
    
});
RegimenLaboral.belongsTo(TipoPersonal,{
    sourceKey:'id',
    foreignKey:'id_tipo_personal'
})



module.exports = TipoPersonal