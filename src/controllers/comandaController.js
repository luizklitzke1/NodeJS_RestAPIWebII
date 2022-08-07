const comandaModel = require("../models/comandaModel")
const produtoModel = require("../models/produtoModel")
const usuarioModel = require("../models/usuarioModel")
const comandaProdutosModel = require("../models/comandaProdutosModel")

async function FormataRetornoComanda(dadosComandaModel) // Função para deixar o retorno dos dados da comanda exatamente como requisitados pela professora
{
    let produtosFormatados = [];

    let produtos = await dadosComandaModel.getProdutos();

    for (let produto of  produtos)
    {
        produtosFormatados.push(
            {
                id : produto.id,
                nome : produto.nome,
                preco : produto.preco,
            }
        )
    }

    let usuario = await dadosComandaModel.getUsuario();

    let jsonComandaFormatada = 
    {
        id              : dadosComandaModel.id,
        idUsuario       : usuario.idUsuario,
        nomeUsuario     : usuario.nomeUsuario,
        telefoneUsuario : usuario.telefoneUsuario,
        produtos        : produtosFormatados,
    }

    return jsonComandaFormatada;
}

module.exports = 
{
    async ListaComandas(request, response)
    {
        try
        {
            const comandas = await comandaModel.findAll({include : [ {model : usuarioModel}, {model : produtoModel} ]});

            let retornoFormatado = []
            for (let comanda of comandas)
            {
                retornoFormatado.push(await FormataRetornoComanda(comanda));
            }  

            return response.json(retornoFormatado);
        }
        catch (error)
        {
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

            var novaComanda = await comandaModel.create({ idUsuario : usuarioComanda.idUsuario});

            for (var produtoRequest of request.body.produtos)
            {
                var [produtoComanda, created] = await produtoModel.findOrCreate(
                    {
                        where: { id : produtoRequest.id},
                        defaults : { id    : produtoRequest.id,
                                     nome  : produtoRequest.nome,
                                     preco : produtoRequest.preco 
                                    }
                    }
                );
                    
                await (novaComanda.addProduto(produtoComanda));
            }

            let retornoFormatado = await FormataRetornoComanda(novaComanda);
            return response.json(retornoFormatado)
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },
}