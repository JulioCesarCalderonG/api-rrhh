const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");
const Licencia = require("./licencia");
const Merito = require("./merito");
const RegimenLaboral = require("./regimen-laboral");
const Reporte = require("./reporte");


class Personal extends Model{}


Personal.init({
    dni:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    escalafon:{
        type:DataTypes.CHAR
    },
    fecha_inicio:{
        type:DataTypes.CHAR
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    timestamps:false,
    tableName:'personal',
    sequelize
});
/* Relacion personal general */
Personal.hasMany(General,{
    as:'FK_GeneralPersonal',
    foreignKey:'id_personal'
});

General.belongsTo(Personal,{
    sourcekey:'id',
    foreignKey:'id_personal'
});

/* Relacion general licencia */
Personal.hasMany(Licencia,{
    as:'FK_LicenciaPersonal',
    foreignKey:'id_personal'
});

Licencia.belongsTo(Personal,{
    sourcekey:'id',
    foreignKey:'id_personal'
})

/* Relacion merito personal */
Personal.hasMany(Merito,{
    as:'FK_MeritoPersonal',
    foreignKey:'id_personal'
});

Merito.belongsTo(Personal,{
    sourceKey:'id',
    foreignKey:'id_personal'
})

/* Relacion personal regimen laboral */
Personal.hasMany(RegimenLaboral,{
    as:'FK_RPersonal',
    foreignKey:'id_personal'
});
RegimenLaboral.belongsTo(Personal,{
    sourceKey:'id',
    foreignKey:'id_personal'
})

/* Foreign Personal -  Reporte */

Personal.hasMany(Reporte,{
    as:'FK_ReportePersonal',
    foreignKey:'id_personal'
});

Reporte.belongsTo(Personal,{
    sourcekey:'id',
    foreignKey:'id_personal'
});

module.exports = Personal;








