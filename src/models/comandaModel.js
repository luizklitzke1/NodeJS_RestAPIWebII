const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");

const Usuario = require("./usuarioModel");

class Comanda extends Sequelize.Model{
    toJSON() // Para retornar formatado exatamente como pedido pela professora
    {
       
        console.log(this.produtos);
        console.log(this.Produtos);

        let jsonComandaFormatada = 
        {
            id              : this.id,
            idUsuario       : usuario.idUsuario,
            nomeUsuario     : usuario.nomeUsuario,
            telefoneUsuario : usuario.telefoneUsuario,

        }

        console.log(jsonComandaFormatada);

        return jsonComandaFormatada;
    }
}

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
        sequelize : sequelizeDB, modelName : "Comandas",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

Comanda.belongsTo(Usuario, {foreignKey : "idUsuario"})

module.exports = Comanda
