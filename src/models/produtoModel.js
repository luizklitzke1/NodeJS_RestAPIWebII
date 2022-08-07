const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");

class Produto extends Sequelize.Model{}

Produto.init(
    {
        id :
        {
            type          : Sequelize.INTEGER,
            primaryKey    : true,
            autoIncrement : true,
            allowNull     : false,
        },

        nome :
        {
            type      : Sequelize.STRING,
            allowNull : false,
        },

        preco : 
        {
            type : Sequelize.INTEGER,
        },
    },

    {
        sequelize : sequelizeDB, modelName : "Produtos"
    }
)

module.exports = Produto
