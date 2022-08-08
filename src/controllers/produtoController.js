const produtoModel = require("../models/produtoModel");
const Usuario = require("../models/usuarioModel");

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

            if (produtoCadastrado)
            {
                return response.json(produtoCadastrado)
            }
            else
            {
                return response.status(400).send("Nenhum produto encontrado para esse ID.");
            }
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
            const produtoCadastrado = await produtoModel.findByPk(request.body.id);

            if (produtoCadastrado)
            {
                return response.status(409).send("Já existe um produto cadastrado com esse ID.");
            }

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
            const produtoCadastrado = await produtoModel.findByPk(request.params.id);

            if (produtoCadastrado)
            {
                console.log(request.body);
                await produtoCadastrado.update(request.body);
            
                return response.json(produtoCadastrado);
            }
            else
            {
                return response.status(400).send("Nenhum produto encontrado para esse ID.");
            }
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },

    async DeletaProduto(request, response)
    {
        try
        {
            const produtoCadastrado = await produtoModel.findByPk(request.params.id);

            if (produtoCadastrado)
            {
                await produtoCadastrado.destroy();
                return response.json(produtoCadastrado);
            }
            else
            {
                return response.status(400).send("Nenhum produto encontrado para esse ID.");
            }
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    }
}