const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");
const Comanda = require("./comandaModel");
const Produto = require("./produtoModel");

const ComandaProdutos = sequelizeDB.define("comandaProdutos", 
{
});
 
Comanda.belongsToMany(Produto, { through: ComandaProdutos, foreignKey : "comandaIdComanda"});
Produto.belongsToMany(Comanda, { through: ComandaProdutos, foreignKey : "produtoIdProduto"});