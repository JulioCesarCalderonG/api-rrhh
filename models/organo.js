const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const UnidadOrganica = require("./unidadorganica");


class Organo extends Model{};

Organo.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.STRING
    },
    id_sede:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'organo',
    timestamps:false
});

Organo.hasMany(UnidadOrganica,{
    as:'FK_UOrganicaOrgano',
    foreignKey:'id_organo'
});

UnidadOrganica.belongsTo(Organo,{
    sourcekey:'id',
    foreignKey:'id_organo'
})

module.exports = Organo;