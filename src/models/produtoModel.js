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
            allowNull : false,
        },
    },

    {
        sequelize : sequelizeDB, modelName : "produtos",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = Produto
