const Express = require("express")
const comandaController = require("../controllers/comandaController")
const validaToken = require("../middleware/authJWT")

const routes = Express.Router();

/**
* @swagger
* components:
*   schemas:
*     Comanda:
*       type: object
*       required:
*         - idUsuario
*         - nomeUsuario
*         - telefoneUsuario
*         - produtos
*       properties:
*         id:
*           type: integer
*           description: Id do comanda
*         idUsuario:
*           type: integer
*           description: Id do usuário vinculado à comanda
*         nomeUsuario:
*           type: string
*           description: Nome do usuário vinculado à comanda
*         telefoneUsuario:
*           type: description
*           description: Telefone do usuário vinculado à comanda
*         produtos:
*           type: array
*           items:
*               $ref: '#/components/schemas/Produto'
*           description: Lista de produtos vinculados à comanda 
*       example:
*         idUsuario: 1
*         nomeUsuario: joao
*         telefoneUsuario: "478888888"
*         produtos: [{ "id":1, "nome":"X-Salada", "preco":30}, { "id":2, "nome":"X-Bacon", "preco":35}]
*/

 /**
* @swagger
* tags:
*   name: Comandas
*   description: Controle do cadastro de comandas
*/

/**
* @swagger
* /comandas:
*   get:
*     summary: Retorna uma lista com todas comandas cadastradas e itens vinculados
*     tags: [Comandas]
*     security:
*       - bearerAuth: [] 
*     responses:
*       200:
*         description: Lista dos comandas cadastradas
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Comanda'
*       401:
*         description: Token informado inválido
*       403:
*         description: Token de autenticação não enviado
*/
routes.get("/", validaToken, comandaController.ListaComandas);

/**
* @swagger
* /comandas/{id}:
*   get:
*     summary: Buscar os dados de uma comanda pelo ID
*     tags: [Comandas]
*     security:
*       - bearerAuth: [] 
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID da comanda
*     responses:
*       200:
*         description: Dados da comanda correspondente
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comanda'
*       401:
*         description: Token informado inválido
*       403:
*         description: Token de autenticação não enviado
*       404:
*         description: Nenhum comanda encontrada para esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.get("/:id", validaToken, comandaController.BuscaComanda);

/**
* @swagger
* /comandas:
*   post:
*     summary: Registar uma nova comanda
*     tags: [Comandas]
*     security:
*       - bearerAuth: [] 
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comanda'
*     responses:
*       200:
*         description: Comanda criado com sucesso
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comanda'
*       401:
*         description: Token informado inválido
*       403:
*         description: Token de autenticação não enviado
*       500:
*         description: Erro interno do servidor
*/
routes.post("/", validaToken, comandaController.CriaComanda);

/**
* @swagger
* /comandas/{id}:
*  put:
*    summary: Atualiza uma comanda pelo ID
*    tags: [Comandas]
*    security:
*       - bearerAuth: [] 
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: integer
*        required: true
*        description: O ID da comanda
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Comanda'
*    responses:
*      200:
*        description: Dados da comanda atualizados
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Comanda'
*      401:
*        description: Token informado inválido
*      403:
*        description: Token de autenticação não enviado
*      404:
*        description: Comanda não encontrada
*      500:
*        description: Erro interno do servidor
*/
routes.put("/:id", validaToken, comandaController.AtualizaComanda);

/**
* @swagger
* /comandas/{id}:
*   delete:
*     summary: Deleta uma comanda baseado no ID
*     tags: [Comandas]
*     security:
*       - bearerAuth: [] 
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID da comanda
* 
*     responses:
*       200:
*         description: Comanda deletada
*       401:
*         description: Token informado inválido
*       403:
*         description: Token de autenticação não enviado
*       404:
*         description: Comanda não encontrada
*       500:
*         description: Erro interno do servidor
*/

routes.delete("/:id", validaToken, comandaController.DeletaComanda);

module.exports = routes;