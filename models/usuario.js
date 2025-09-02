const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/database");
const Perfil = require("./perfil");

class Usuario extends Model{}

Usuario.init({
    idUsuario:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Perfil, // referencia al modelo Perfil
            key: 'idPerfil'
        }
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    sequelize,
    tableName: 'usuario',
    timestamps: true
});

// Definir relación
Usuario.belongsTo(Perfil, { foreignKey: 'idPerfil', as: 'perfil' });
Perfil.hasMany(Usuario, { foreignKey: 'idPerfil', as: 'usuarios' });


module.exports=Usuario;