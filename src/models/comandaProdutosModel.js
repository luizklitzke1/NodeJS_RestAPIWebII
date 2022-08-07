const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");
const Comanda = require("./comandaModel");
const Produto = require("./produtoModel");

const ComandaProdutos = sequelizeDB.define("ComandaProdutos", 
{
});
 
Comanda.belongsToMany(Produto, { through: ComandaProdutos, foreignKey : "ComandaIdComanda"});
Produto.belongsToMany(Comanda, { through: ComandaProdutos, foreignKey : "ProdutoIdProduto"});