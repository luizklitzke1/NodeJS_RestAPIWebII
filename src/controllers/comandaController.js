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
            const comandas = await comandaModel.findAll({include : [ { model : usuarioModel }, { model : produtoModel } ]});

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

    async BuscaComanda(request, response)
    {
        try
        {
            const comanda = await comandaModel.findByPk(request.params.id, {include : [ { model : usuarioModel }, { model : produtoModel } ]});

            if (comanda == null)
            {
                return response.status(400).send("Comanda não encontrada para esse ID");
            }

            let retornoFormatado = await FormataRetornoComanda(comanda); 

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
            let usuarioComanda = await usuarioModel.findByPk(request.body.idUsuario);

            if (usuarioComanda == null)
            {
                return response.status(400).send("IdUsuario informado inválido, por favor verificar que o mesmo está cadastrado");
            }

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

    async AtualizaComanda(request, response)
    {
        try
        {
            let comanda = await comandaModel.findByPk(request.params.id, {include : [ { model : usuarioModel }, { model : produtoModel } ]});
            if (comanda == null)
            {
                return response.status(400).send("Comanda não encontrada para esse ID");
            }

            //Apenas atualizar a relação do ID de usuário, assumindo que linka com um cadastrado
            //sem cadastrar, porque não teria como saber qual parametro do usuário veio e dai já ficava muita cópia de rota
            if (request.body.idUsuario != null)
            {
                let usuario = await usuarioModel.findByPk(request.body.idUsuario);

                if (usuario == null)
                {
                    return response.status(400).send("IdUsuario informado inválido, por favor verificar que o mesmo está cadastrado");
                }

                comanda.update({ idUsuario : usuario.idUsuario });
            }

            if (request.body.produtos != null)
            {
                await comanda.setProdutos([]); // Limpa a lista de produtos e adiciona os novos, adicionando caso não existam, já que tem tudo

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

                    await (comanda.addProduto(produtoComanda));
                }
            }

            comanda.save();

            let retornoFormatado = await FormataRetornoComanda(comanda);
            return response.json(retornoFormatado)
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },

    async DeletaComanda(request, response)
    {
        try
        {
            if (request.usuario.admin == false)
                return response.status(403).send("Usuário não tem acesso à esse recurso.");

            const comandaCadastrada = await comandaModel.findByPk(request.params.id);

            if (comandaCadastrada)
            {
                await comandaCadastrada.destroy();
                return response.status(200).send("comanda removida");
            }
            else
            {
                return response.status(400).send("Nenhuma comanda encontrada para esse ID.");
            }
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    }
}