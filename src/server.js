const express       = require("express"                );
const bodyParser    = require("body-parser"            );
const swaggerUI     = require("swagger-ui-express"     );
const swaggerJsdoc  = require("swagger-jsdoc"          );
const cors          = require("cors"                   );
const usuarioRouter = require("./routers/usuarioRouter");
const produtoRouter = require("./routers/produtoRouter");

const api = new express();

const options = 
{
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API Suficiência Web II",
      version: "1.0",
      description:
        "Rest API simples em NodeJS para Suficiência de Web II - Luiz G Klitzke",
    },
    servers: [
			{
				url: "http://localhost:8080",
			},
		],
  },
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsdoc(options);

api.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));

api.use(cors()),
api.use(express.json());

api.use("/usuarios", usuarioRouter)
api.use("/produtos", produtoRouter)

api.listen(8080);
