const Sequelize = require("sequelize")
const sequelizeDB = require("../sequelize/sequelizeConfigs");

class Usuario extends Sequelize.Model{
    toJSON() // Overload do método para não listar senhas nas requests
    {
        let JSONSemSenha =
        {
            idUsuario : this.idUsuario,
            nomeUsuario : this.nomeUsuario,
            telefoneUsuario : this.telefoneUsuario,
            admin : this.senha
        }

        return JSONSemSenha;
    }
}

Usuario.init(
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
            type : Sequelize.STRING,
            allowNull : false,
        },

        senha :
        {
            type      : Sequelize.STRING,
            allowNull : false,
        },

        admin :
        {
            type      : Sequelize.BOOLEAN,
            allowNull : false,
        }
    },

    {
        sequelize : sequelizeDB, modelName : "Usuarios",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = Usuario
