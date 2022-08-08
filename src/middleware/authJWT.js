const jwt = require("jsonwebtoken")

function validaToken(request, response, next)
{
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
    {
        return response.status(401).send("Token de autenticação não enviado.");
    }

    jwt.verify(token, process.env.JWT_ACCESSS_TOKEN_USER, (error, usuario) => {
        if (error)
        {
            return response.status(403).send("Token informado inválido.");
        }

        request.usuario = usuario;
        next();
    })
}

module.exports = validaToken;
