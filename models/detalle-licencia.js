const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Licencia = require("./licencia");

class DetalleLicencia extends Model{}

DetalleLicencia.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_tipo_licencia:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'detalle_licencia',
    timestamps:false
});

DetalleLicencia.hasMany(Licencia,{
    as:'FK_LicenciaDetalleLicencia',
    foreignKey:'id_detalle_licencia'
});

Licencia.belongsTo(DetalleLicencia,{
    sourceKey:'id',
    foreignKey:'id_detalle_licencia'
})


module.exports = DetalleLicencia;