const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');



class Historial extends Model{};

Historial.init({
    descripcion:{
        type:DataTypes.STRING
    },
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    },
    id_administrador:{
        type:DataTypes.INTEGER
    },
    id_tipo_record:{
        type:DataTypes.INTEGER
    },
    id_record:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'historial',
    timestamps:false
});

module.exports = Historial;