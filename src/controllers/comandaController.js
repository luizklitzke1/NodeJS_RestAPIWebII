const comandaModel = require("../models/comandaModel")
const produtoModel = require("../models/produtoModel")
const usuarioModel = require("../models/usuarioModel")
const comandaProdutosModel = require("../models/comandaProdutosModel")

module.exports = 
{
    async ListaComandas(request, response)
    {
        try
        {
            const comandas = await comandaModel.findAll({include : [ {model : usuarioModel}, {model : produtoModel} ]});

            //Formatar o retorno para ficar os dados do cadastro de usuário e produtos do modelo que a professora quer 
            let listaFormatada = [];

            for (let dadosComanda of comandas)
            {
                let dadosFormtados = 
                {
                    id : dadosComanda.id,
                    idUsuario : dadosComanda.idUsuario,
                    nomeUsuario : dadosComanda.Usuario.nomeUsuario,
                    telefoneUsuario : dadosComanda.Usuario.telefoneUsuario,
                    produtos : dadosComanda.Produtos
                }

                listaFormatada.push(dadosFormtados);
            }

            return response.json(listaFormatada)
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },

    async CriaComanda(request, response)
    {
        try
        {
            var [usuarioComanda, created] = await usuarioModel.findOrCreate(
                {
                    where: { idUsuario : request.body.idUsuario},
                    defaults : { idUsuario       : request.body.idUsuario,
                                 nomeUsuario     : request.body.nomeUsuario,
                                 telefoneUsuario : request.body.telefoneUsuario 
                                }
                }
            );

            console.log("criou", usuarioComanda.idUsuario);

            var novaComanda = await comandaModel.create({ idUsuario : usuarioComanda.idUsuario, produtos : request.body.produtos} , {include : produtoModel});

            /*
            for (var produtoRequest of request.body.produtos)
            {
                console.log(produtoRequest["id"], produtoRequest["nome"], produtoRequest["preco"]);
                var [produtoComanda, created] = await produtoModel.findOrCreate(
                    {
                        where: { id : produtoRequest.id},
                        defaults : { id    : produtoRequest["id"],
                                     nome  : produtoRequest["nome"],
                                     preco : produtoRequest["preco"] 
                                    }
                    }
                );
                    
                await (novaComanda.addProduto(produtoComanda));
            }
            */

            return response.json(novaComanda)
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },
}