const { update } = require("../models/produtoModel");
const produtoModel = require("../models/produtoModel")

module.exports = 
{
    async ListaProdutos(request, response)
    {
        try
        {
            const produtos = await produtoModel.findAll();
            return response.json(produtos)
        }
        catch (error)
        {
            return response.status(500).send(error);;
        }
    },

    async BuscaProduto(request, response)
    {
        try
        {
            const produtoCadastrado = await produtoModel.findByPk(request.params.id);
            return response.json(produtoCadastrado)
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async CriaProduto(request, response)
    {
        try
        {
            const produto = await produtoModel.create(
                {
                    id    : request.body.id  ,
                    nome  : request.body.nome,
                    preco : request.body.preco
                }
            );
            return response.json(produto)
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async AtualizaProduto(request, response)
    {
        try
        {
            const produtoCadastrado = await produtoModel.findByPk(request.body.id);

            if (produtoCadastrado)
            {
                produtoCadastrado.id    = request.body.id  ,
                produtoCadastrado.nome  = request.body.nome,
                produtoCadastrado.preco = request.body.preco

                await produtoCadastrado.save();
            }

            return response.json(produtos);
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async DeletaProduto(request, response)
    {
        try
        {
            const produtoCadastrado = await produtoModel.findByPk(request.params.id);
            await produtoCadastrado.destroy();
            return response.json(produtoCadastrado);
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    }
}