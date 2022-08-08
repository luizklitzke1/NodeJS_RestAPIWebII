# NodeJS_RestAPIWebII

API em NodeJS com rotas para CRUD de comandas, produtos e usuários desenvolvida para prova de suficiência da matéria WEB II.

Documentação de todas as rotas em Swagger.
Validação de token com JWT, através do login simples de usuário e senha armazenada em plain text para prova de conceito.
Arquitetura MVC, utilização de Sequelize como ORM e chamada para DAO interno.

##Configurações para Token:
Para acessar qualquer rota menos a de cadastros e login de usuário é necessário informar um token de bearer no header da request.
Basta acessar a rotina de usuarios/login e informar no corpo o id e senha que correspondam à alguma conta registrada para receber um token válido.

**Importate** configurar a definição do secret JWT_ACCESSS_TOKEN_USER para geração e validação de tokens encontrado em .env.

##Para rodar:
`npm start`
