const Express = require("express")
const usuarioController = require("../controllers/usuarioController")
const validaToken = require("../middleware/authJWT")

const routes = Express.Router();

/**
* @swagger
* components:
*   schemas:
*     Usuario:
*       type: object
*       required:
*         - idUsuario
*         - nomeUsuario
*         - telefoneUsuario
*         - senha
*       properties:
*         idUsuario:
*           type: integer
*           description: Nome do usuário
*         nomeUsuario:
*           type: string
*           description: Nome do usuário
*         telefoneUsuario:
*           type: string
*           description: Telefone do usuário
*         senha:
*           type: string
*           description: Senha do usuário
*         admin:
*           type: boolean
*           description: Usuário é ou não admin
*       example:
*         idUsuario: 1
*         nomeUsuario: joao
*         telefoneUsuario: "478888888"
*         senha : "senhaSuperSecreta123"
*         admin : true
*/

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:            # arbitrary name for the security scheme
*       type: http
*       scheme: bearer
*       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
*/

 /**
* @swagger
* tags:
*   name: Usuários
*   description: Controle do cadastro de usuários
*/

/**
* @swagger
* /usuarios:
*   get:
*     summary: Retorna uma lista com todos usuários cadastrados
*     tags: [Usuários]
*     security:
*       - bearerAuth: [] 
*     responses:
*       200:
*         description: Lista dos usuários cadastrados
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Usuario'
*       500:
*         description: Erro interno do servidor
*/
routes.get("/", validaToken, usuarioController.ListaUsuarios);

/**
* @swagger
* /usuarios/{id}:
*   get:
*     summary: Buscar os dados de um usuário pelo ID
*     tags: [Usuários]
*     security:
*       - bearerAuth: [] 
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID do usuário
*     responses:
*       200:
*         description: Dados do usuário correspondente
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Usuario'
*       404:
*         description : Nenhum usuário encontrado para esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.get("/:id", usuarioController.BuscaUsuario);

/**
* @swagger
* /usuarios:
*   post:
*     summary: Registar um novo usuário
*     tags: [Usuários]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Usuario'
*     responses:
*       200:
*         description: Usuário criado com sucesso
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Usuario'
*       409:
*         description: Já existe um usuário cadastrado com esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.post("/", usuarioController.CriaUsuario);

/**
* @swagger
* /usuarios/login:
*   post:
*     summary: Logar usuário com id e senha para receber token de acesso
*     tags: [Usuários]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: integer
*               senha:
*                 type: string
*             example:
*               id: 10
*               senha: senhaSuperSecreta
*     responses:
*       200:
*         description: Usuário logado com sucesso
*         content:
*           application/json:
*             token:
*               type: string
*               description: token para ser utilizado como bearer nas requests pelo usuário
*       404:
*         description: Não existe um usuário cadastrado com esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.post("/login", usuarioController.LogaUsuario);

/**
* @swagger
* /usuarios/{id}:
*  put:
*    summary: Atualiza um usuário pelo ID
*    tags: [Usuários]
*    security:
*       - bearerAuth: [] 
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: integer
*        required: true
*        description: O ID do usuário
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Usuario'
*    responses:
*      200:
*        description: Dados do usuário atualizados
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Usuario'
*      404:
*        description: Nenhum usuário encontrado para esse ID
*      500:
*        description: Erro interno do servidor
*/
routes.put("/", usuarioController.AtualizaUsuario);

/**
* @swagger
* /usuarios/{id}:
*   delete:
*     summary: Deleta um usuário baseado no ID
*     tags: [Usuários]
*     security:
*       - bearerAuth: [] 
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID do usuário
* 
*     responses:
*       200:
*         description: Usuário deletado
*       404:
*         description: Nenhum usuário encontrado para esse ID
*       500:
*         description: Erro interno do servidor
*/

routes.delete("/:id", usuarioController.DeletaUsuario);

module.exports = routes;