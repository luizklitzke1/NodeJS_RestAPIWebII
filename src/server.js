const express       = require("express"                );
const swaggerUI     = require("swagger-ui-express"     );
const swaggerJsdoc  = require("swagger-jsdoc"          );
const cors          = require("cors"                   );
const usuarioRouter = require("./routers/usuarioRouter");
const produtoRouter = require("./routers/produtoRouter");
const comandaRouter = require("./routers/comandaRouter");

const api = new express();

const options = 
{
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API Suficiência Web II",
      version: "1.0",
      description:
        "Rest API de Comandas, Produtos e Usuários em NodeJS para Suficiência de Web II - Luiz G Klitzke",
    },
    servers: [
			{
				url: "http://localhost:8080/RestAPIFurb",
			},
		],
  },
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsdoc(options);

api.use("/RestAPIFurb/swagger", swaggerUI.serve, swaggerUI.setup(specs));

api.use(cors()),
api.use(express.json());

api.use("/RestAPIFurb/usuarios", usuarioRouter)
api.use("/RestAPIFurb/produtos", produtoRouter)
api.use("/RestAPIFurb/comandas", comandaRouter)

api.listen(8080);
