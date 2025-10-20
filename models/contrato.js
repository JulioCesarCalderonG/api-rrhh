const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Cargo = require("./cargo");
const Organo = require("./organo");
const Personal = require("./personal");
const TipoContrato = require("./tipo-contrato");


class Contrato extends Model { }

Contrato.init({
    idContrato: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idCargo:{
        type:DataTypes.INTEGER
    },
    idOrgano:{
        type:DataTypes.INTEGER
    },
    idPersonal:{
        type:DataTypes.INTEGER
    },
    idTipoContrato:{
        type:DataTypes.INTEGER
    },
    idPersonalSuplencia:{
        type:DataTypes.INTEGER
    },
    codigoContrato:{
        type:DataTypes.STRING(18)
    },
    resoAdministrativa:{
        type:DataTypes.STRING(50)
    },
    fechaResAdmin: {
        type: DataTypes.DATE
    },
    fechaInicio: {
        type: DataTypes.DATE
    },
    fechaTermino: {
        type: DataTypes.DATE
    },
    monto:{
        type:DataTypes.DECIMAL(10,2)
    },
    estado:{
        type:DataTypes.CHAR(5)
    }
}, {
    timestamps: true,
    tableName: 'contrato',
    sequelize
});


// Definir relación
Contrato.belongsTo(Cargo, { foreignKey: 'idCargo', as: 'cargo' });
Cargo.hasMany(Contrato, { foreignKey: 'idCargo', as: 'contrato' });

// Definir relación
Contrato.belongsTo(Organo, { foreignKey: 'idOrgano', as: 'organo' });
Organo.hasMany(Contrato, { foreignKey: 'idOrgano', as: 'contrato' });

// Definir relación
Contrato.belongsTo(Personal, { foreignKey: 'idPersonal', as: 'personal' });
Personal.hasMany(Contrato, { foreignKey: 'idPersonal', as: 'contratoTitular' });

// Definir relación
Contrato.belongsTo(TipoContrato, { foreignKey: 'idTipoContrato', as: 'tipocontrato' });
TipoContrato.hasMany(Contrato, { foreignKey: 'idTipoContrato', as: 'contrato' });

// Definir relación
Contrato.belongsTo(Personal, { foreignKey: 'idPersonalSuplencia', as: 'personalsuplencia' });
Personal.hasMany(Contrato, { foreignKey: 'idPersonalSuplencia', as: 'contratoSuplencia' });



module.exports =Contrato;