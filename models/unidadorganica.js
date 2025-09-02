const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Area = require("./area");


class UnidadOrganica extends Model{}

UnidadOrganica.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    },
    id_organo:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'unidad_organica'
});

UnidadOrganica.hasMany(Area,{
    as:'FK_AreaUOrganica',
    foreignKey:'id_unidad_organica'
});

Area.belongsTo(UnidadOrganica,{
    sourcekey:'id',
    foreignKey:'id_unidad_organica'
})

module.exports = UnidadOrganica;