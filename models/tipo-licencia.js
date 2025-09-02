const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const DetalleLicencia = require("./detalle-licencia");

class TipoLicencia extends Model{}

TipoLicencia.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'tipo_licencia',
    timestamps:false
});

TipoLicencia.hasMany(DetalleLicencia,{
    as:'FK_DetalleLicenciaTipo',
    foreignKey:'id_tipo_licencia'    
});

DetalleLicencia.belongsTo(TipoLicencia,{
    sourceKey:'id',
    foreignKey:'id_tipo_licencia'
})


module.exports = TipoLicencia;