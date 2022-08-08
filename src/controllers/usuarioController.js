require("dotenv").config()
const { update } = require("../models/usuarioModel");
const usuarioModel = require("../models/usuarioModel")
const jwt = require("jsonwebtoken")

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
                    telefoneUsuario : request.body.telefoneUsuario,
                    senha           : request.body.senha          ,
                    admin           : request.body.admin
                }
            );
            return response.json(usuario)
        }
        catch (error)
        {
            return response.status(500).send(error);
        }
    },

    async LogaUsuario(request, response)
    {
        try
        {
            var usuario = await usuarioModel.findByPk(request.body.id);
            
            if (usuario == null)
            {
                return response.status(409).send("Não existe um usuário cadastrado com esse ID.");
            }

            if (usuario.senha != request.body.senha)
            {
                return response.status(409).send("Senha ou ID inválido informados.");
            }

            const jwtToken = jwt.sign(usuario.toJSON(), process.env.JWT_ACCESSS_TOKEN_USER);
            return response.status(200).send( {token : jwtToken });
        }
        catch (error)
        {
            console.log(error);
            return response.status(500).send(error);
        }
    },

    async AtualizaUsuario(request, response)
    {
        try
        {
            const usuarioCadastrado = await usuarioModel.findByPk(request.params.id);

            if (usuarioCadastrado)
            {
                await usuarioCadastrado.update(request.body);
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
            if (request.usuario.admin == false)
            {
                return response.status(401).send("Usuário não tem acesso à esse recurso.");
            }

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
