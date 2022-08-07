const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");
const Produto = require("./produtoModel");

const produtoModel = require("./produtoModel")

class Comanda extends Sequelize.Model{}

Comanda.init(
    {
        id :
        {
            type          : Sequelize.INTEGER,
            primaryKey    : true,
            autoIncrement : true,
            allowNull     : false,
        },

        idUsuario :
        {
            type          : Sequelize.INTEGER,
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
            allowNull : false,
        },
    },

    {
        sequelize : sequelizeDB, modelName : "Comandas",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = Comanda
