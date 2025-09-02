const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Merito extends Model{};


Merito.init({
    codigo_documento:{
        type:DataTypes.STRING
    },
    instancia:{
        type:DataTypes.STRING
    },
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_sancion:{
        type:DataTypes.INTEGER
    },
    id_estado:{
        type:DataTypes.INTEGER
    },
    fecha:{
        type:DataTypes.CHAR
    },
    observacion:{
        type:DataTypes.TEXT
    },
    tipo_documento:{
        type:DataTypes.INTEGER
    },
    tipo_instancia:{
        type:DataTypes.INTEGER
    },
    id_instancia:{
        type:DataTypes.INTEGER
    },
    documento:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'merito',
    timestamps:false
});


module.exports = Merito;