const { update } = require("../models/usuarioModel");
const usuarioModel = require("../models/usuarioModel")

module.exports = 
{
    async ListaUsuarios(request, response)
    {
        try
        {
            const usuarios = await usuarioModel.findAll();
            return response.json(usuarios)
        }
        catch (error)
        {
            return response.status(500).send(error);;
        }
    },

    async BuscaUsuario(request, response)
    {
        try
        {
            const usuarioCadastrado = await usuarioModel.findByPk(request.params.id);

            if (usuarioCadastrado)
            {
                return response.json(usuarioCadastrado)
            }
            else
            {
                return response.status(404).send("Usuário não encontrado para esse ID");
            }
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async CriaUsuario(request, response)
    {
        try
        {
            const usuarioCadastrado = await usuarioModel.findByPk(request.body.idUsuario);

            if (usuarioCadastrado)
            {
                return response.status(409).send("Já existe um usuário cadastrado com esse ID.");
            }

            const usuario = await usuarioModel.create(
                {
                    idUsuario       : request.body.idUsuario      ,
                    nomeUsuario     : request.body.nomeUsuario    ,
                    telefoneUsuario : request.body.telefoneUsuario
                }
            );
            return response.json(usuario)
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async AtualizaUsuario(request, response)
    {
        try
        {
            const usuarioCadastrado = await usuarioModel.findByPk(request.body.id);

            if (usuarioCadastrado)
            {
                usuarioCadastrado.idUsuario       = request.body.idUsuario,
                usuarioCadastrado.nomeUsuario     = request.body.nomeUsuario,
                usuarioCadastrado.telefoneUsuario = request.body.telefoneUsuario

                await usuarioCadastrado.save();

                return response.json(usuarioCadastrado);
            }
            else
            {
                return response.status(404).send("Usuário não encontrado para esse ID");
            }
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async DeletaUsuario(request, response)
    {
        try
        {
            const usuarioCadastrado = await usuarioModel.findByPk(request.params.id);

            if (usuarioCadastrado)
            {
                await usuarioCadastrado.destroy();
                return response.json(usuarioCadastrado);
            }
            else
            {
                return response.status(404).send("Usuário não encontrado para esse ID");
            }
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    }
}