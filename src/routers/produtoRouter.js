const Express = require("express")
const produtoController = require("../controllers/produtoController")

const routes = Express.Router();

/**
* @swagger
* components:
*   schemas:
*     Produto:
*       type: object
*       required:
*         - nome
*         - preco
*       properties:
*         id:
*           type: integer
*           description: Id do produto
*         nome:
*           type: string
*           description: Nome do produto
*         preco:
*           type: integer
*           description: Preço do produto
*       example:
*         id: 1
*         nome: X - Salada
*         preco: 25
*/

 /**
* @swagger
* tags:
*   name: Produtos
*   description: Controle do cadastro de produtos
*/

/**
* @swagger
* /produtos:
*   get:
*     summary: Retorna uma lista com todos produtos cadastrados
*     tags: [Produtos]
*     responses:
*       200:
*         description: Lista dos produtos cadastrados
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Produto'
*/
routes.get("/", produtoController.ListaProdutos);

/**
* @swagger
* /produtos/{id}:
*   get:
*     summary: Buscar os dados de um produto pelo ID
*     tags: [Produtos]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID do produto
*     responses:
*       200:
*         description: Dados do produto correspondente
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Produto'
*       404:
*         description: Nenhum produto encontrado para esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.get("/:id", produtoController.BuscaProduto);

/**
* @swagger
* /produtos:
*   post:
*     summary: Registar um novo produto
*     tags: [Produtos]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Produto'
*     responses:
*       200:
*         description: Produto criado com sucesso
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Produto'
* 
*       404:
*         description: Nenhum produto encontrado para esse ID
*       500:
*         description: Erro interno do servidor
*/
routes.post("/", produtoController.CriaProduto);

/**
* @swagger
* /produtos/{id}:
*  put:
*    summary: Atualiza um produto pelo ID
*    tags: [Produtos]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: integer
*        required: true
*        description: O ID do produto
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Produto'
*    responses:
*      200:
*        description: Dados do produto atualizados
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Produto'
*      404:
*        description: Produto não encontrado
*      500:
*        description: Erro interno do servidor
*/
routes.put("/", produtoController.AtualizaProduto);

/**
* @swagger
* /produtos/{id}:
*   delete:
*     summary: Deleta um produto baseado no ID
*     tags: [Produtos]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID do produto
* 
*     responses:
*       200:
*         description: Produto deletado
*       404:
*         description: Produto não encontrado
*       500:
*         description: Erro interno do servidor
*/

routes.delete("/:id", produtoController.DeletaProduto);

module.exports = routes;