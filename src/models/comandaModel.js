const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");

const Usuario = require("./usuarioModel");

class Comanda extends Sequelize.Model{}

Comanda.init(
    {
        id :
        {
            type          : Sequelize.INTEGER,
            primaryKey    : true,
            autoIncrement : true,
            allowNull     : false,
        }
    },

    {
        sequelize : sequelizeDB, modelName : "comandas",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

Comanda.belongsTo(Usuario, {foreignKey : "idUsuario"})

module.exports = Comanda
