const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Organo = require("./organo");


class Sede extends Model{}

Sede.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'sede',
    timestamps:false
});

Sede.hasMany(Organo,{
    as:'FK_OrganoSede',
    foreignKey:'id_sede'
});

Organo.belongsTo(Sede,{
    sourcekey:'id',
    foreignKey:'id_sede'
})



module.exports = Sede;
