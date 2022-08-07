const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");

class Comanda extends Sequelize.Model{}

Comanda.init(
    {
        idUsuario :
        {
            type          : Sequelize.INTEGER,
            primaryKey    : true,
            autoIncrement : true,
            allowNull     : false,
        },

        nomeUsuario :
        {
            type      : Sequelize.STRING,
            allowNull : false,
        },

        telefoneUsuario : 
        {
            type : Sequelize.INTEGER,
        },
    },

    {
        sequelize : sequelizeDB, modelName : "Comandas"
    }
)

module.exports = Comanda
