const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/database");

class Perfil extends Model{}

Perfil.init({
    idPerfil:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    sequelize,
    tableName: 'perfil',
    timestamps: true
});


module.exports=Perfil;