const Express = require("express")
const comandaController = require("../controllers/comandaController")

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
*     responses:
*       200:
*         description: Lista dos comandas cadastradas
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Comanda'
*/
routes.get("/", comandaController.ListaComandas);

/**
* @swagger
* /comandas:
*   post:
*     summary: Registar uma nova comanda
*     tags: [Comandas]
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
*       500:
*         description: Erro interno do servidor
*/
routes.post("/", comandaController.CriaComanda);

module.exports = routes;