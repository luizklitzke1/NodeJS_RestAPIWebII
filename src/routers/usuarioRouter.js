const Express = require("express")
const usuarioController = require("../controllers/usuarioController")

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
*       example:
*         idUsuario: 1
*         nomeUsuario: joao
*         telefoneUsuario: "478888888"
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
routes.get("/", usuarioController.ListaUsuarios);

/**
* @swagger
* /usuarios/{id}:
*   get:
*     summary: Buscar os dados de um usuário pelo ID
*     tags: [Usuários]
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
* /usuarios/{id}:
*  put:
*    summary: Atualiza um usuário pelo ID
*    tags: [Usuários]
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