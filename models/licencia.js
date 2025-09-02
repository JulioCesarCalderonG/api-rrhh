const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Licencia extends Model{};


Licencia.init({
    codigo_documento:{
        type:DataTypes.STRING
    },
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_detalle_licencia:{
        type:DataTypes.INTEGER
    },
    dias:{
        type:DataTypes.CHAR
    },
    inicio:{
        type:DataTypes.CHAR
    },
    fin:{
        type:DataTypes.CHAR
    },
    documento:{
        type:DataTypes.STRING
    },
    tipo_documento:{
        type:DataTypes.INTEGER
    },
    area:{
        type:DataTypes.INTEGER
    },
    numero:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'licencia',
    timestamps:false
});



module.exports = Licencia